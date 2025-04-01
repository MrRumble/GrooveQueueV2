from fastapi import FastAPI
from signup import router as signup_router

app = FastAPI()
app.include_router(signup_router)

@app.get("/")
async def root():
    return {"message": "Groove Queue Backend Running!"}

from fastapi import UploadFile, File
from firebase_config import bucket

@app.post("/upload-test")
async def upload_file(file: UploadFile = File(...)):
    try:
        blob = bucket.blob(f"uploads/{file.filename}")
        blob.upload_from_string(await file.read(), content_type=file.content_type)
        blob.make_public()  # Make the file publicly accessible
        return {"message": "File uploaded successfully!", "url": blob.public_url}
    except Exception as e:
        return {"error": str(e)}
