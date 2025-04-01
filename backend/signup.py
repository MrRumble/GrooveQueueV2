from fastapi import APIRouter, HTTPException
from firebase_admin import auth, firestore
from pydantic import BaseModel, validator
import re

router = APIRouter()

# User model for signup with password validation
class UserSignup(BaseModel):
    email: str
    password: str
    display_name: str

    # Password validation using a Pydantic validator
    @validator("password")
    def validate_password(cls, password):
        # Check if the password is at least 8 characters long
        if len(password) < 8:
            raise ValueError("Password must be at least 8 characters long.")
        
        # Check if the password contains at least one uppercase letter, one lowercase letter, and one digit
        if not re.search(r"[A-Z]", password):
            raise ValueError("Password must contain at least one uppercase letter.")
        if not re.search(r"[a-z]", password):
            raise ValueError("Password must contain at least one lowercase letter.")
        if not re.search(r"\d", password):
            raise ValueError("Password must contain at least one digit.")
        
        # Optionally, check for a special character
        if not re.search(r"[^A-Za-z0-9]", password):
            raise ValueError("Password must contain at least one special character.")
        
        return password

# Signup Route
@router.post("/signup")
async def signup(user: UserSignup):
    try:
        # Create the user in Firebase Authentication
        user_record = auth.create_user(
            email=user.email,
            password=user.password,
            display_name=user.display_name
        )

        # Save user data to Firestore after creating user
        db = firestore.client()
        user_data = {
            "email": user.email,
            "display_name": user.display_name,
            "uid": user_record.uid,
        }
        
        # Create a new document in the "users" collection with the user's UID
        db.collection("users").document(user_record.uid).set(user_data)

        # Return a success message with the user UID
        return {"message": "User created", "uid": user_record.uid}
    except auth.EmailAlreadyExistsError:
        raise HTTPException(status_code=400, detail="Email already exists")
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

