import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { createReadStream, existsSync, statSync } from "fs";
import { resolve } from "path";

// Configuration for Tigris (T3) Storage - Loaded from environment
// Run with: node --env-file=.env upload-videos.js
const endpoint = process.env.AWS_ENDPOINT;
const bucket = process.env.AWS_BUCKET;
const region = process.env.AWS_DEFAULT_REGION || "auto";
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

if (!accessKeyId || !secretAccessKey || !bucket || !endpoint) {
    console.error("❌ Missing required environment variables (AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_BUCKET, AWS_ENDPOINT)");
    console.log("Usage: node --env-file=.env upload-videos.js");
    process.exit(1);
}

const s3Client = new S3Client({
    region,
    endpoint,
    forcePathStyle: true,
    credentials: { accessKeyId, secretAccessKey },
});

const files = [
    "Mainn.mp4",
    "main1.mp4",
    "main2.mp4",
    "main3.mp4",
];

async function uploadFiles() {
    console.log(`🚀 Starting upload to bucket: ${bucket}`);
    console.log(`Endpoint: ${endpoint}\n`);

    for (const file of files) {
        try {
            const filePath = resolve(`resources/js/assets/${file}`);
            
            if (!existsSync(filePath)) {
                console.error(`✗ File not found locally: ${filePath}`);
                continue;
            }

            const stats = statSync(filePath);
            const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);
            
            console.log(`⏳ Uploading ${file} (${fileSizeMB} MB)...`);

            await s3Client.send(new PutObjectCommand({
                Bucket: bucket,
                Key: `videos/${file}`,
                Body: createReadStream(filePath),
                ContentLength: stats.size,
                ContentType: "video/mp4",
            }));

            console.log(`✅ Finished: ${file}`);
        } catch (error) {
            console.error(`✗ Failed to upload ${file}:`, error.message);
        }
    }

    console.log("\n✨ All tasks complete!");
}

uploadFiles();

