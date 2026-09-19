# აპლიკაციის დაინსტალირება

1. npm run install
2. npm run dev

# მაღაზიის დამატება

მაგალითისთვის ავიღოთ მაღაზია "mova", რომლის myshopify სახელიც არის "https://admin.shopify.com/store/wemid3-0x"

1. შევქმნა ახალი აპლიკაცია dev dashboard-ზე.
2. App name - logisticswise-mova
3. App URL - https://logisticswise.ge/shopify
4. Scopes - write_inventory,read_orders,read_products
5. ვაჭერთ Release 2ჯერ. იქმნება ახალი ვერსია
6. ვაჭერთ App settings-ს, ვაკოპირებთ Client ID-ს და Secret-ს და ვსვავთ logisticswise პროფილში შესაბამის ველებში.
7. გადავდივართ აპლიკაციის Overview-ში, ვაჭერთ Select distribution method
8. ვირჩევთ Custom distribution-ს
9. ვწერთ მაღაზიის myshopify სახელს "https://admin.shopify.com/store/wemid3-0x"
10. ვაჭერთ გენერირებას
11. ვაკოპირებთ ლინკს
12. თუ წვდომა გვაქვს მაღაზიაზე, გადავდივართ მათთან და ვხსნით მოკოპირებულ ლინკს
13. ვაინსტალირებთ აპლიკაციას
14. მაღაზიის myshopify სახელი და ტოკენი გადაიგზავნება logisticswise php პლატფორმაზე

# ვებჰუკის დამატება

1. გადავდივართ მაღაზიის ადმინკაზე https://admin.shopify.com/store/wemid3-0x
2. ვხსნით ვებჰუკების სექციას სეთინგებში https://admin.shopify.com/store/wemid3-0x/settings/notifications/webhooks
3. ვაჭერთ Create webhook ღილაკს
4. Event - Order payment
5. Format - JSON
6. URL - https://logisticswise.ge/shopify/orders
7. Webhook API version - Latest ვერსია რომელიცაა. წესით მეორე ეწერება.
8. ვაჭერთ save-ს.
