﻿# logisticwise

ინსტალაციის flow ახალი მომხმარებლისთვის:
1)
* კლიენტი გვაძლევს myshopify სახელს, ჩვენ შევდივართ პარტნერსზე და ვამატებთ ამ მაღაზიას სისტემაში (partners.shopify.com -> stores)
* კლიენტი გვეუბნება კოლაბორაციის კოდს, რომელსაც იპოვნიან Users and permissions-ში, ჩვენ ვაგზავნით კოლაბორაციის მოთხოვნას
* Permissions -> Select all
* log-in ღილაკის დახმარებით გადავდივართ მაღაზიის ადმინზე
* ბაზაში ვინახავთ shopName
2)
* shopToken-ის შექმნა: settings -> apps and sales channel -> Develop apps -> Create an app -> 
* დავარქვათ "Logisticwise" -> Create app -> Configuration -> მონიშნეთ ყველა, save -> API credentials -> Install app (Access tokens-ის ქვეშ),
* მოაკოპირეთ ტოკენი და შეინახეთ, მეორედ აღარ გამოჩნდება უსაფრთხოების პროტოკოლის გამო. ტოკენი უნდა გამოიყურებოდეს დაახლოებით ასე: ""
* ბაზაში ვინახავთ shopToken
3)
* Webhook-ის შექმნა: settings -> notifications -> Webhooks -> Create webhook -> 
* Event -> Order payment | Format -> JSON | URL -> ამ აპლიკაციის URL/orders | Webhook API version -> აქ აირჩიეთ მხოლოდ 2024-04! -> save
