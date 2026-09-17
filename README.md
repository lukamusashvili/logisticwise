# აპლიკაციის დაინსტალირება

npm run install
npm run dev

# მაღაზიის დამატება

მაგალითისთვის ავიღოთ მაღაზია "mova", რომლის myshopify სახელიც არის "https://admin.shopify.com/store/wemid3-0x"

1. შევქმნა ახალი აპლიკაცია dev dashboard-ზე.
2. App name - logisticswise-mova
3. App URL - https://cfe0-176-221-193-106.ngrok-free.app
4. Scopes - write_inventory,read_orders,read_products
5. ვაჭერთ Release. იქმნება ახალი ვერსია
6. გადავდივართ Overview-ში, ვაჭერთ Select distribution method
7. ვირჩევთ Custom distribution-ს
8. ვწერთ მაღაზიის myshopify სახელს "https://admin.shopify.com/store/wemid3-0x"
9. ვაჭერთ გენერირებას
10. ვაკოპირებთ ლინკს
11. თუ წვდომა გვაქვს მაღაზიაზე, გადავდივართ მათთან და ვხსნით მოკოპირებულ ლინკს
12. ვაინსტალირებთ აპლიკაციას
13. მაღაზიის myshopify სახელი და ტოკენი გადაიგზავნება logisticswise php პლატფორმაზე

# ვებჰუკის დამატება

1. გადავდივართ მაღაზიის ადმინკაზე https://admin.shopify.com/store/wemid3-0x
2. ვხსნით ვებჰუკების სექციას სეთინგებში https://admin.shopify.com/store/wemid3-0x/settings/notifications/webhooks
3. ვაჭერთ Create webhook ღილაკს
4. Event - Order payment
5. Format - JSON
6. URL - https://cfe0-176-221-193-106.ngrok-free.app
7. Webhook API version - stable ვერსია რომელიცაა. წესით მეორე ეწერება.
8. ვაჭერთ save-ს.
