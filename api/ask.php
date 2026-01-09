<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$input = json_decode(file_get_contents("php://input"), true);

if (!isset($input["prompt"])) {
    http_response_code(400);
    echo json_encode(["error" => "Prompt is required"]);
    exit;
}

$apiKey = getenv("GEMINI_API_KEY");
$prompt = $input["prompt"];

$data = [
    "contents" => [[
        "parts" => [[ "text" => $prompt ]]
    ]]
];

$ch = curl_init(
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=$apiKey"
);

curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, ["Content-Type: application/json"]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
curl_close($ch);

echo $response;

