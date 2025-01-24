curl -X POST http://localhost:3003/api/user \
  -H "Content-Type: application/json" \
  -d '{
    "name": "rango", 
    "surname": "Doe",
    "idNumber": "123457868545", 
    "email": "rango@gmail.com", 
    "password": "rango123", 
    "role": "admin", 
    "designation": "developer",
    "joining_date": "2025-01-22",
    "salary": 50000,
    "phone": "1234567890",
    "address": "123 Main St, City, South Africa" 
  }'


curl -X POST http://localhost:3003/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "rango@gmail.com",
    "password": "rango123"
  }'

curl -X POST http://localhost:3003/api/restaurants \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OTBiYzcxZWE4MTZmZWNiYjM1M2MzNiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTczNzU1Mjc5MSwiZXhwIjoxNzM3NTU2MzkxfQ.horHcvjK9TTSnwPQR4NWXhB__iCOFrb8xv03mvcUv7U" \
  -H "Content-Type: multipart/form-data" \
  -F "name=Fine Dine" \
  -F "description=Luxury dining experience" \
  -F "address=123 Gourmet St, Food City" \
  -F "contact=1234567890" \
  -F "email=info@finedine.com" \
  -F "service=Dine-in" \
  -F "type=Fine Dining" \
  -F "priceOfBooking=500" \
  -F "numberOfDaysBooked=5" \
  -F "numberOfPeopleBooked=20" \
  -F "image=@C:/Users/tshid/Pictures/restaurant/res1.jpg"


  ////
