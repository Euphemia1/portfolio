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

// Updated URL structure: v1beta and gemini-2.0-flash
$url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

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
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if (curl_errno($ch)) {
    http_response_code(500);
    echo json_encode(["error" => "CURL Error: " . curl_error($ch)]);
} else {
    http_response_code($httpCode);
    echo $response;
}

curl_close($ch);
