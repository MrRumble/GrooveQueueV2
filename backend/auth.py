from fastapi import APIRouter, HTTPException, Depends
from firebase_admin import auth
from pydantic import BaseModel

router = APIRouter()

# User model
class UserSignup(BaseModel):
    email: str
    password: str
    display_name: str

# Signup Route
@router.post("/signup")
async def signup(user: UserSignup):
    try:
        user_record = auth.create_user(
            email=user.email,
            password=user.password,
            display_name=user.display_name
        )
        return {"message": "User created", "uid": user_record.uid}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# Verify Firebase Token (For Protected Routes)
def verify_token(token: str):
    try:
        decoded_token = auth.verify_id_token(token)
        return decoded_token
    except Exception as e:
        raise HTTPException(status_code=401, detail="Invalid token")
