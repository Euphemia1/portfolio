<?php
// Set headers for JSON response
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Get the raw POST content
$input = json_decode(file_get_contents("php://input"), true);

if (!isset($input["prompt"])) {
    http_response_code(400);
    echo json_encode(["error" => "No prompt provided in the request."]);
    exit;
}

// 1. Try to find the API Key
$apiKey = getenv("GEMINI_API_KEY");

if (!$apiKey || $apiKey === "YOUR_API_KEY_HERE") {
    $files = [
        __DIR__ . "/../js/config.js",
        __DIR__ . "/../js/config.example.js"
    ];
    
    foreach ($files as $file) {
        if (file_exists($file)) {
            $content = file_get_contents($file);
            if (preg_match('/const GEMINI_API_KEY = ["\'](.+?)["\']/', $content, $matches)) {
                if ($matches[1] !== "YOUR_API_KEY_HERE") {
                    $apiKey = $matches[1];
                    break;
                }
            }
        }
    }
}

if (!$apiKey) {
    http_response_code(500);
    echo json_encode(["error" => "API key missing. Please paste your key in js/config.js"]);
    exit;
}

// 2. Prepare the request to Google (v1beta for Gemini 1.5 Flash)
$prompt = $input["prompt"];
$parts = [["text" => $prompt]];

// Add image data if provided (Base64)
if (isset($input["imageData"]) && !empty($input["imageData"]) && strpos($input["imageData"], 'base64,') !== false) {
    $imgData = $input["imageData"];
    $base64Data = explode('base64,', $imgData)[1];
    $mimePart = explode(':', explode(';', $imgData)[0])[1];
    
    $parts[] = [
        "inline_data" => [
            "mime_type" => $mimePart,
            "data" => $base64Data
        ]
    ];
}

$data = [
    "contents" => [[
        "parts" => $parts
    ]]
];

// Tried in order; if one model has no quota left, the next is attempted automatically.
$candidateModels = ["gemini-2.0-flash", "gemini-2.5-flash", "gemini-1.5-flash"];

function isQuotaOrRateError($httpCode, $responseBody) {
    if ($httpCode === 429) return true;
    $decoded = json_decode($responseBody, true);
    $message = $decoded["error"]["message"] ?? "";
    return preg_match('/quota|rate.?limit|resource_exhausted/i', $message) === 1;
}

foreach ($candidateModels as $model) {
    $url = "https://generativelanguage.googleapis.com/v1beta/models/{$model}:generateContent";

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "Content-Type: application/json",
        "X-goog-api-key: " . trim($apiKey)
    ]);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    // Fix for local SSL issues (Required for local development)
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

    $response = curl_exec($ch);

    if (curl_errno($ch)) {
        error_log("CURL Error (model: {$model}): " . curl_error($ch));
        curl_close($ch);
        http_response_code(500);
        echo json_encode(["error" => "AI_UNAVAILABLE"]);
        exit;
    }

    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($httpCode >= 200 && $httpCode < 300) {
        http_response_code($httpCode);
        echo $response;
        exit;
    }

    error_log("Gemini API error (model: {$model}): " . $response);

    if (!isQuotaOrRateError($httpCode, $response)) {
        http_response_code($httpCode);
        echo json_encode(["error" => "AI_UNAVAILABLE"]);
        exit;
    }
    // Otherwise fall through and try the next model.
}

http_response_code(429);
echo json_encode(["error" => "AI_BUSY"]);
