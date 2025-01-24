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
   "email": "gumbu@gmail.com",  
    "password": "gumbu123"
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

curl -X PUT http://localhost:3003/api/restaurants/67935e235d56b86ef945b71c \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OTBiYzcxZWE4MTZmZWNiYjM1M2MzNiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTczNzcxNDAwOSwiZXhwIjoxNzM3NzE3NjA5fQ.8hyfvPN6KPLaJ8GD8-wZgUnQ6Ds4saqj39I-JEDDC-c" \
  -H "Content-Type: multipart/form-data" \
  -F "name=Mountain Retreat" \
  -F "description=Cozy retreat with mountain views" \
  -F "address=987 Alpine Lane, High Peaks" \
  -F "contact=1239876543" \
  -F "email=informed@mountainretreat.com" \
  -F "service=Dine-in and Lodging" \
  -F "type=Resort Restaurant" \
  -F "priceOfBooking=800" \
  -F "numberOfDaysBooked=3" \
  -F "numberOfPeopleBooked=50" \
  -F "image=@C:/Users/tshid/Pictures/restaurant/mountainretreat.jpg"

  ////
  
  curl -X DELETE http://localhost:3003/api/restaurants/67936a6bbd66cee72d3ffbd3 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OTBiYzcxZWE4MTZmZWNiYjM1M2MzNiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTczNzcxNzg4OSwiZXhwIjoxNzM3NzIxNDg5fQ.1LJmQm8RUXQ1Bb2CF2HIPAzbjCXweyU_12MgegwuLRU"
