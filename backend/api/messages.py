from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from database.connection import get_db
from models.models import AdminMessage, User
from schemas.schemas import MessageCreate, MessageResponse

router = APIRouter(prefix="/api/messages", tags=["Messages"])

@router.get("", response_model=List[MessageResponse])
def list_messages(receiver_id: int = None, db: Session = Depends(get_db)):
    """Fetch messages sent by Admin to designers."""
    query = db.query(AdminMessage)
    if receiver_id:
        query = query.filter((AdminMessage.receiver_id == receiver_id) | (AdminMessage.receiver_id == None))
    return query.order_by(AdminMessage.created_at.desc()).all()

@router.post("", response_model=MessageResponse)
def send_message(data: MessageCreate, db: Session = Depends(get_db)):
    """Admin sends a directive, urgent alert, or message to a designer or all designers."""
    msg = AdminMessage(
        sender_name="Ramya Kudelli (Admin)",
        receiver_id=data.receiver_id,
        receiver_name=data.receiver_name or "All Designers",
        subject=data.subject,
        content=data.content,
        priority=data.priority
    )
    db.add(msg)
    db.commit()
    db.refresh(msg)
    return msg

@router.delete("/{message_id}")
def delete_message(message_id: int, db: Session = Depends(get_db)):
    """Delete a sent message."""
    msg = db.query(AdminMessage).filter(AdminMessage.id == message_id).first()
    if not msg:
        raise HTTPException(status_code=404, detail="Message not found")
    db.delete(msg)
    db.commit()
    return {"status": "deleted", "id": message_id}
