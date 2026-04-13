import { S3Client, PutBucketAclCommand, PutBucketCorsCommand } from "@aws-sdk/client-s3";

const endpoint = "https://t3.storage.dev";
const bucket = "persona-videos-9o4zonpdhw";
const accessKeyId = "tid_g_AAPtputSeUlarXhTnPstLtMeapnQBYMcDYCRuklwVlbJkMLC";
const secretAccessKey = "tsec_GgOFlVnPBpVfK9TN+g-zcPMZnCylZE5qBULaBhzySztMzu5BV47EfaHpJd0E4EGxgXGf7N";

const s3Client = new S3Client({
    region: "auto",
    endpoint,
    forcePathStyle: true,
    credentials: { accessKeyId, secretAccessKey },
});

async function configure() {
    try {
        console.log("🛠️  Configuring Bucket ACL to 'public-read'...");
        await s3Client.send(new PutBucketAclCommand({
            Bucket: bucket,
            ACL: "public-read",
        }));
        console.log("✅ Bucket is now public.");

        console.log("\n🌐 Configuring CORS...");
        const cors = {
            CORSRules: [
                {
                    AllowedHeaders: ["*"],
                    AllowedMethods: ["GET", "HEAD"],
                    AllowedOrigins: ["*"],
                    ExposeHeaders: [],
                    MaxAgeSeconds: 3000,
                },
            ],
        };

        await s3Client.send(new PutBucketCorsCommand({
            Bucket: bucket,
            CORSConfiguration: cors,
        }));
        console.log("✅ CORS configuration applied.");

        console.log("\n🚀 All done! Please refresh your browser (and restart your dev server if you haven't).");
    } catch (error) {
        console.error("❌ Configuration failed:", error.message);
        console.log("\n💡 Note: If this fails, you can easily make the bucket public via the Tigris Console/Dashboard in Railway.");
    }
}

configure();
