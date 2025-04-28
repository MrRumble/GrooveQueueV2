from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from signup import router as signup_router
from firebase_config import bucket

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://your-production-domain.com"],  # Add your frontend URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(signup_router)

@app.get("/")
async def root():
    return {"message": "Groove Queue Backend Running!"}

@app.post("/upload-test")
async def upload_file(file: UploadFile = File(...)):
    try:
        blob = bucket.blob(f"uploads/{file.filename}")
        blob.upload_from_string(await file.read(), content_type=file.content_type)
        blob.make_public()  # Make the file publicly accessible
        return {"message": "File uploaded successfully!", "url": blob.public_url}
    except Exception as e:
        return {"error": str(e)}