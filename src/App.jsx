import { useState, useMemo } from "react";

// ═══════════════ INDIVIDUAL RETAILER DATA ═══════════════
const PSFC = [
  {n:"Aloe",p:2.32,u:"each",o:"Organic",g:"Mexico"},{n:"Apple Cameo IPM",p:1.70,u:"/lb",o:"IPM",g:"Champlain Orchards VT"},{n:"Apple Cosmic Crisp",p:2.65,u:"/lb",o:"Organic",g:"Washington"},{n:"Apple Granny Smith",p:2.47,u:"/lb",o:"Organic",g:"Washington"},{n:"Apple Honeycrisp IPM",p:2.40,u:"/lb",o:"IPM",g:"Local 500mi"},{n:"Apple Opal",p:2.30,u:"/lb",o:"Organic",g:"Washington"},{n:"Apple Pink Lady IPM",p:1.89,u:"/lb",o:"IPM",g:"Local 500mi"},{n:"Apple Envy",p:2.58,u:"/lb",o:"Organic",g:"Washington"},{n:"Artichokes",p:3.42,u:"each",o:"Conv.",g:"Mexico/USA"},{n:"Artichokes Organic",p:2.90,u:"each",o:"Organic",g:"California"},{n:"Arugula Bunch",p:1.83,u:"/bunch",o:"Conv.",g:"Florida"},{n:"Asparagus Organic",p:5.84,u:"/lb",o:"Organic",g:"Mexico"},{n:"Asparagus Conv.",p:5.15,u:"/lb",o:"Conv.",g:"Mexico/Peru"},{n:"Asparagus Delta Queen",p:6.17,u:"/lb",o:"Conv.",g:"California"},{n:"Avocado Hass Organic",p:2.95,u:"/lb",o:"Organic",g:"Mexico"},{n:"Avocado Hass Conv.",p:2.25,u:"/lb",o:"Conv.",g:"Mexico"},{n:"Bananas Organic",p:0.99,u:"/lb",o:"Organic",g:"Colombia/Ecuador/Peru"},{n:"Bananas Baby",p:2.03,u:"/lb",o:"Conv.",g:"Ecuador/Costa Rica"},{n:"Basil Hydroponic Bunch",p:2.39,u:"/bunch",o:"Hydro",g:"USA"},{n:"Basil Thai",p:31.89,u:"/lb",o:"Conv.",g:"USA"},{n:"Beans Green Bag Organic",p:4.36,u:"each",o:"Organic",g:"USA"},{n:"Beans Green Round",p:4.44,u:"/lb",o:"Conv.",g:"Florida/Georgia"},{n:"Beans Haricot Vert",p:3.70,u:"each",o:"Organic",g:"Guatemala"},{n:"Beets Badger Row 7",p:2.51,u:"/lb",o:"Organic",g:"Local 500mi"},{n:"Beets Chioggia",p:2.26,u:"/lb",o:"Organic",g:"Local 500mi"},{n:"Beets Gold",p:2.38,u:"/lb",o:"Organic",g:"Pennsylvania"},{n:"Beets Red",p:2.13,u:"/lb",o:"Organic",g:"Local 500mi"},{n:"Bergamot Orange",p:3.68,u:"/lb",o:"Conv.",g:"Italy"},{n:"Blackberries 6oz",p:4.86,u:"each",o:"Organic",g:"Mexico/USA"},{n:"Blueberries Pint",p:7.07,u:"each",o:"Conv.",g:"Colombia/Mexico"},{n:"Blueberries Pint Organic",p:9.34,u:"each",o:"Organic",g:"Mexico/USA"},{n:"Bok Choy Adult White",p:1.85,u:"/lb",o:"Organic",g:"California"},{n:"Bok Choy Baby Green",p:3.18,u:"/lb",o:"Organic",g:"USA"},{n:"Broccoli Rabe",p:2.76,u:"/bunch",o:"Organic",g:"USA"},{n:"Broccoli Slaw",p:3.65,u:"each",o:"Organic",g:"USA"},{n:"Broccoli Organic",p:2.53,u:"/lb",o:"Organic",g:"USA"},{n:"Broccolini",p:3.12,u:"/bunch",o:"Organic",g:"Mexico/USA"},{n:"Brussels Sprouts Loose",p:1.46,u:"/lb",o:"Conv.",g:"California"},{n:"Brussels Sprouts Bag",p:2.34,u:"each",o:"Organic",g:"USA"},{n:"Cabbage Green",p:1.28,u:"/lb",o:"Organic",g:"Local 500mi"},{n:"Cabbage Napa",p:2.29,u:"/lb",o:"Organic",g:"Local 500mi"},{n:"Cabbage Red",p:1.21,u:"/lb",o:"Organic",g:"USA"},{n:"Cape Gooseberries",p:2.53,u:"each",o:"Conv.",g:"Colombia"},{n:"Carrots 1lb Bag Organic",p:1.80,u:"each",o:"Organic",g:"California"},{n:"Carrots 1lb Bag Conv.",p:1.19,u:"each",o:"Conv.",g:"California"},{n:"Carrots 5lb Bag",p:8.13,u:"each",o:"Organic",g:"California"},{n:"Carrots Baby Local",p:8.26,u:"each",o:"Organic",g:"Pete's Greens VT"},{n:"Carrots Baby Organic Bags",p:2.03,u:"each",o:"Organic",g:"California"},{n:"Carrots Baby Rainbow 12oz",p:2.36,u:"each",o:"Organic",g:"California"},{n:"Carrots Baby Conv.",p:2.14,u:"each",o:"Conv.",g:"USA"},{n:"Carrots Loose Orange",p:2.51,u:"/lb",o:"Organic",g:"Local 500mi"},{n:"Carrots Loose Purple",p:2.82,u:"/lb",o:"Organic",g:"Local 500mi"},{n:"Cauliflower White",p:2.82,u:"/lb",o:"Organic",g:"USA"},{n:"Celeriac",p:2.61,u:"/lb",o:"Organic",g:"Local 500mi"},{n:"Celery",p:1.62,u:"/lb",o:"Organic",g:"California"},{n:"Chard Bunch",p:2.37,u:"/bunch",o:"Organic",g:"USA"},{n:"Chayote",p:1.30,u:"/lb",o:"Conv.",g:"Costa Rica"},{n:"Cilantro",p:1.55,u:"/bunch",o:"Organic",g:"USA"},{n:"Cole Slaw",p:3.19,u:"each",o:"Organic",g:"USA"},{n:"Collards Bunch",p:2.29,u:"/bunch",o:"Organic",g:"USA"},{n:"Cucumber English",p:3.98,u:"each",o:"Organic",g:"Canada"},{n:"Cucumber Kirby",p:1.19,u:"/lb",o:"Conv.",g:"Mexico/USA"},{n:"Cucumber Persian",p:3.90,u:"/lb",o:"Conv.",g:"Dominican Republic"},{n:"Cucumber Persian Organic",p:4.30,u:"each",o:"Organic",g:"Mexico"},{n:"Cucumber Slicing",p:2.80,u:"/lb",o:"Organic",g:"Mexico/USA"},{n:"Curry Leaf",p:42.82,u:"/lb",o:"Conv.",g:"California"},{n:"Daikon Purple",p:1.86,u:"/lb",o:"Organic",g:"New York"},{n:"Daikon White",p:2.06,u:"/lb",o:"Organic",g:"USA"},{n:"Dandelions Bunch",p:2.85,u:"/bunch",o:"Organic",g:"Florida"},{n:"Dill Conv.",p:1.29,u:"/bunch",o:"Conv.",g:"USA"},{n:"Dill Organic",p:2.58,u:"/bunch",o:"Organic",g:"USA"},{n:"Eggplant Asian",p:3.23,u:"/lb",o:"Conv.",g:"Honduras"},{n:"Eggplant Organic",p:2.66,u:"/lb",o:"Organic",g:"Mexico/USA"},{n:"Endive 3-pack",p:6.44,u:"each",o:"Organic",g:"California"},{n:"Endive Belgian",p:3.81,u:"/lb",o:"Conv.",g:"Belgium"},{n:"Escarole",p:1.56,u:"/lb",o:"Conv.",g:"Florida"},{n:"Fennel Organic",p:4.51,u:"each",o:"Organic",g:"USA"},{n:"Fennel Conv.",p:2.44,u:"each",o:"Conv.",g:"California"},{n:"Fiddlehead Ferns",p:20.61,u:"/lb",o:"Conv.",g:"Pacific NW"},{n:"Garlic Conv.",p:4.19,u:"/lb",o:"Conv.",g:"Mexico/Peru"},{n:"Garlic Greens Bunch",p:3.96,u:"/bunch",o:"Organic",g:"Local 500mi"},{n:"Garlic Organic",p:5.67,u:"/lb",o:"Organic",g:"California"},{n:"Garlic Black",p:9.32,u:"each",o:"Organic",g:"Pete's Greens VT"},{n:"Ginger Organic",p:2.37,u:"/lb",o:"Organic",g:"Peru"},{n:"Grapefruit Organic",p:1.86,u:"/lb",o:"Organic",g:"Mexico/USA"},{n:"Grapefruit Conv.",p:1.39,u:"/lb",o:"Conv.",g:"Florida"},{n:"Herbs Basil .75oz",p:2.04,u:"each",o:"Organic",g:""},{n:"Herbs Basil Gotham",p:3.65,u:"each",o:"Hydro",g:"Gotham Greens NY"},{n:"Herbs Bay Leaves",p:2.04,u:"each",o:"Organic",g:""},{n:"Herbs Chives Cup",p:2.04,u:"each",o:"Organic",g:""},{n:"Herbs Marjoram Cup",p:2.04,u:"each",o:"Organic",g:""},{n:"Herbs Mint Cup",p:1.03,u:"each",o:"Organic",g:""},{n:"Herbs Oregano Cup",p:2.04,u:"each",o:"Organic",g:""},{n:"Herbs Rosemary Cup",p:2.04,u:"each",o:"Organic",g:""},{n:"Herbs Sage Cup",p:2.04,u:"each",o:"Organic",g:""},{n:"Herbs Tarragon Cup",p:2.04,u:"each",o:"Organic",g:""},{n:"Herbs Thyme Cup",p:4.08,u:"each",o:"Organic",g:""},{n:"Herbs Chives Conv.",p:1.56,u:"each",o:"Conv.",g:"USA"},{n:"Herbs Oregano Conv.",p:1.56,u:"each",o:"Conv.",g:"USA"},{n:"Herbs Rosemary Conv.",p:1.56,u:"each",o:"Conv.",g:"USA"},{n:"Herbs Sage Conv.",p:1.56,u:"each",o:"Conv.",g:"USA"},{n:"Herbs Thyme Conv.",p:1.56,u:"each",o:"Conv.",g:"USA"},{n:"Horseradish",p:4.92,u:"/lb",o:"Conv.",g:"USA"},{n:"Jerusalem Artichokes",p:6.36,u:"/lb",o:"Organic",g:"Local 500mi"},{n:"Jicama",p:1.47,u:"/lb",o:"Conv.",g:"Mexico"},{n:"Kale Green Bunch",p:1.78,u:"/bunch",o:"Organic",g:"USA"},{n:"Kale Lacinato Bunch",p:2.08,u:"/bunch",o:"Organic",g:"USA"},{n:"Kale Red Bunch",p:2.23,u:"/bunch",o:"Organic",g:"Florida"},{n:"Kiwi Organic",p:0.70,u:"each",o:"Organic",g:"Greece"},{n:"Kumquats Fukushu",p:9.66,u:"/lb",o:"Pest. Free",g:"New Jersey"},{n:"Leeks Organic",p:2.72,u:"/lb",o:"Organic",g:"Mexico/USA"},{n:"Lemongrass",p:4.10,u:"/lb",o:"Conv.",g:"Mexico"},{n:"Lemons Lisbon",p:1.62,u:"/lb",o:"Min. Treated",g:"California"},{n:"Lemons Organic",p:1.94,u:"/lb",o:"Organic",g:"Mexico/USA"},{n:"Lemons Pink",p:14.81,u:"/lb",o:"Pest. Free",g:"New Jersey"},{n:"Lemons Sorrento",p:7.87,u:"/lb",o:"Conv.",g:"Italy"},{n:"Lemons Conv.",p:1.16,u:"/lb",o:"Conv.",g:"Argentina/Mexico/USA"},{n:"Lemons Meyer",p:3.10,u:"/lb",o:"Conv.",g:"USA"},{n:"Lettuce Boston/Butter",p:2.44,u:"each",o:"Organic",g:"Florida"},{n:"Lettuce Green Leaf",p:2.31,u:"each",o:"Organic",g:"Local 500mi"},{n:"Lettuce Iceberg",p:3.54,u:"each",o:"Organic",g:"California"},{n:"Lettuce Red Leaf",p:2.25,u:"each",o:"Organic",g:"USA"},{n:"Lettuce Romaine",p:2.29,u:"each",o:"Organic",g:"Florida"},{n:"Lettuce Romaine Hearts",p:4.19,u:"each",o:"Organic",g:"USA"},{n:"Lime Leaf Makrut",p:77.26,u:"/lb",o:"Conv.",g:"California"},{n:"Limes Key Bagged",p:2.63,u:"each",o:"Conv.",g:"Mexico"},{n:"Limes Organic",p:3.21,u:"/lb",o:"Organic",g:"Mexico"},{n:"Limes Palestinian Sweet",p:14.81,u:"/lb",o:"Organic",g:"California"},{n:"Mangos Ataulfo",p:2.67,u:"/lb",o:"Organic",g:"Mexico"},{n:"Micro Greens Perfect Mix",p:4.60,u:"each",o:"Organic",g:"New York"},{n:"Micro Greens Arugula",p:4.60,u:"each",o:"Organic",g:"New York"},{n:"Micro Greens Sampler",p:5.22,u:"each",o:"Organic",g:"Blue Moon NJ/PA"},{n:"Micro Greens Snow Pea",p:4.14,u:"each",o:"Organic",g:"New York"},{n:"Micro Greens Cilantro",p:4.60,u:"each",o:"Organic",g:"New York"},{n:"Micro Greens Spicy",p:4.30,u:"each",o:"Non-GMO",g:"NJ/NY"},{n:"Micro Greens Super Mix",p:4.30,u:"each",o:"Non-GMO",g:"NJ/NY"},{n:"Micro Greens Broccoli",p:5.14,u:"each",o:"Organic",g:"Agrarian Feast NY"},{n:"Micro Greens Daikon Radish",p:5.14,u:"each",o:"Organic",g:"Agrarian Feast NY"},{n:"Micro Greens Kale",p:5.14,u:"each",o:"Organic",g:"Agrarian Feast NY"},{n:"Micro Greens Salad Mix",p:8.88,u:"each",o:"Organic",g:"Agrarian Feast NY"},{n:"Mint Bunch",p:1.96,u:"/bunch",o:"Conv.",g:"USA"},{n:"Mushroom Maitake",p:19.32,u:"/lb",o:"Organic",g:"USA"},{n:"Mushroom Beech",p:11.58,u:"/lb",o:"Organic",g:"USA"},{n:"Mushroom Black Pearl Oyster",p:11.59,u:"/lb",o:"Organic",g:"Agrarian Feast NY"},{n:"Mushroom Black Trumpet",p:32.19,u:"/lb",o:"Conv.",g:"Oregon"},{n:"Mushroom Chanterelles",p:19.32,u:"/lb",o:"Conv.",g:"Pacific NW"},{n:"Mushroom Cremini",p:5.15,u:"/lb",o:"Organic",g:"Pennsylvania"},{n:"Mushroom Hedgehog",p:29.62,u:"/lb",o:"Conv.",g:"Oregon"},{n:"Mushroom Lion's Mane Cup",p:4.73,u:"each",o:"Organic",g:"Leep Foods NY"},{n:"Mushroom Lion's Mane Loose",p:14.17,u:"/lb",o:"Organic",g:"Agrarian Feast NY"},{n:"Mushroom Morels",p:46.36,u:"/lb",o:"Conv.",g:"California"},{n:"Mushroom Oyster",p:6.09,u:"/lb",o:"Conv.",g:"Pennsylvania"},{n:"Mushroom Oyster Blue Cup",p:3.87,u:"each",o:"Organic",g:"Leep Foods NY"},{n:"Mushroom Portobello",p:5.41,u:"/lb",o:"Organic",g:"Pennsylvania"},{n:"Mushroom Royal Trumpet",p:17.13,u:"/lb",o:"Organic",g:"Pennsylvania"},{n:"Mushroom Shiitake",p:8.80,u:"/lb",o:"Organic",g:"NJ/PA"},{n:"Mushroom White",p:4.71,u:"/lb",o:"Organic",g:"Pennsylvania"},{n:"Mustards Bunch",p:5.16,u:"/bunch",o:"Organic",g:"California"},{n:"Nopales Cactus",p:9.28,u:"/lb",o:"Organic",g:"Miami FL"},{n:"Okra",p:4.71,u:"/lb",o:"Conv.",g:"Honduras"},{n:"Onion Red",p:1.63,u:"/lb",o:"Organic",g:"Local 500mi"},{n:"Onion White",p:1.63,u:"/lb",o:"Organic",g:"Local 500mi"},{n:"Onion Yellow",p:1.13,u:"/lb",o:"Organic",g:"USA"},{n:"Onion 3lb Bag",p:1.56,u:"each",o:"Conv.",g:"USA"},{n:"Onion Sweet",p:0.86,u:"/lb",o:"Conv.",g:"Georgia"},{n:"Onion Pearl Bags",p:2.97,u:"each",o:"Conv.",g:"Canada/USA"},{n:"Oranges Blood Organic",p:2.77,u:"/lb",o:"Organic",g:"California"},{n:"Oranges Navel Heirloom",p:2.04,u:"/lb",o:"Organic",g:"Buck Brand CA"},{n:"Oranges Blood Conv.",p:1.47,u:"/lb",o:"Conv.",g:"California"},{n:"Oranges Cara Cara",p:1.76,u:"/lb",o:"Organic",g:"California"},{n:"Oranges Navel Organic",p:1.85,u:"/lb",o:"Organic",g:"California"},{n:"Oranges Navel Conv.",p:1.40,u:"/lb",o:"Conv.",g:"California"},{n:"Oro Blanco",p:2.64,u:"/lb",o:"Conv.",g:"California"},{n:"Papaya Red Flesh",p:1.37,u:"/lb",o:"Conv.",g:"Guatemala/Mexico"},{n:"Parsley Curly",p:1.98,u:"/bunch",o:"Organic",g:"Hepworth Farms NY"},{n:"Parsley Plain",p:1.98,u:"/bunch",o:"Organic",g:"Local 500mi"},{n:"Parsley Plain Conv.",p:0.74,u:"/bunch",o:"Conv.",g:"Texas"},{n:"Parsnips",p:2.61,u:"/lb",o:"Organic",g:"USA"},{n:"Pea Tendril Baby",p:25.76,u:"/lb",o:"Organic",g:"Local 500mi"},{n:"Pea Snap Bag",p:3.23,u:"each",o:"Conv.",g:"Guatemala"},{n:"Pears Anjou",p:2.14,u:"/lb",o:"Organic",g:"Washington"},{n:"Pears Asian",p:4.61,u:"/lb",o:"Conv.",g:"New Jersey"},{n:"Pears Comice",p:1.34,u:"/lb",o:"Conv.",g:"Washington"},{n:"Pears Bosc",p:2.14,u:"/lb",o:"Organic",g:"USA"},{n:"Peas Snow",p:2.64,u:"/lb",o:"Conv.",g:"Guatemala/Peru"},{n:"Peas Sugar Snap",p:3.84,u:"/lb",o:"Conv.",g:"Guatemala/Peru"},{n:"Peppers Green",p:3.38,u:"/lb",o:"Organic",g:"Florida"},{n:"Peppers Habanero",p:6.31,u:"/lb",o:"Conv.",g:"Mexico/USA"},{n:"Peppers Jalapeno",p:0.95,u:"/lb",o:"Conv.",g:"Mexico/USA"},{n:"Peppers Mini Sweet",p:4.22,u:"each",o:"Organic",g:"Mexico/USA"},{n:"Peppers Orange",p:5.77,u:"/lb",o:"Organic",g:"Canada/Israel/Mexico"},{n:"Peppers Poblano",p:3.30,u:"/lb",o:"Conv.",g:"Mexico/USA"},{n:"Peppers Red Bell",p:6.00,u:"/lb",o:"Organic",g:"Canada/Israel/Mexico"},{n:"Peppers Red Conv.",p:3.01,u:"/lb",o:"Conv.",g:"Canada/Mexico/NL"},{n:"Peppers Thai Chile",p:10.50,u:"/lb",o:"Conv.",g:"Mexico"},{n:"Peppers Yellow",p:5.68,u:"/lb",o:"Organic",g:"Canada/Israel/Mexico"},{n:"Peppers Red Fresno",p:8.54,u:"/lb",o:"Conv.",g:"North Carolina"},{n:"Peppers Serrano",p:3.87,u:"/lb",o:"Conv.",g:"USA"},{n:"Pineapple Honeyglow",p:8.71,u:"each",o:"Conv.",g:"Costa Rica/Honduras"},{n:"Pineapple Gold",p:5.73,u:"each",o:"Organic",g:"Costa Rica"},{n:"Pineberries 10oz",p:6.44,u:"each",o:"Conv.",g:"USA"},{n:"Plantains",p:1.00,u:"/lb",o:"Conv.",g:"Ecuador"},{n:"Plums Lemon Yellow",p:4.86,u:"/lb",o:"Conv.",g:"Chile"},{n:"Potatoes 5lb Russet",p:4.78,u:"each",o:"Organic",g:"Wisconsin"},{n:"Potatoes Confetti",p:4.36,u:"each",o:"Organic",g:"California"},{n:"Potatoes Fingerling",p:3.18,u:"/lb",o:"Organic",g:"Local 500mi"},{n:"Potatoes Gold",p:1.21,u:"/lb",o:"Organic",g:"Canada/USA"},{n:"Potatoes Red",p:2.01,u:"/lb",o:"Organic",g:"California"},{n:"Potatoes Russet Loose",p:1.21,u:"/lb",o:"Organic",g:"Wisconsin"},{n:"Pummelo",p:2.09,u:"/lb",o:"Organic",g:"California"},{n:"Radicchio",p:2.72,u:"/lb",o:"Organic",g:"Mexico/USA"},{n:"Radish Bunch",p:2.44,u:"/bunch",o:"Organic",g:"USA"},{n:"Radish Black",p:2.84,u:"/lb",o:"Organic",g:"Local 500mi"},{n:"Radish Watermelon",p:2.55,u:"/lb",o:"Organic",g:"Local 500mi"},{n:"Raspberries Red",p:4.83,u:"each",o:"Organic",g:"Mexico/USA"},{n:"Rutabagas",p:2.43,u:"/lb",o:"Organic",g:"Local 500mi"},{n:"Salad Kit Caesar",p:4.59,u:"each",o:"Hydro",g:"Gotham Greens NY"},{n:"Salad Kit Goddess",p:4.59,u:"each",o:"Hydro",g:"Gotham Greens NY"},{n:"Salad Loose Arugula",p:6.79,u:"/lb",o:"Organic",g:"USA"},{n:"Salad Loose Asian Mix",p:10.31,u:"/lb",o:"IPM",g:"Lancaster PA"},{n:"Salad Loose Chard",p:10.31,u:"/lb",o:"Organic",g:"Lancaster PA"},{n:"Salad Loose Baby Kale",p:10.31,u:"/lb",o:"Organic",g:"Local 500mi"},{n:"Salad Loose Mache",p:12.45,u:"/lb",o:"Organic",g:"Lancaster PA"},{n:"Salad Loose Mizuna",p:10.31,u:"/lb",o:"Organic",g:"Lancaster PA"},{n:"Salad Loose Mustard",p:11.16,u:"/lb",o:"Organic",g:"Lancaster PA"},{n:"Salad Loose Mixed",p:8.95,u:"/lb",o:"Organic",g:"USA"},{n:"Salad Gotham Butterhead",p:3.71,u:"each",o:"Hydro",g:"Gotham Greens NY"},{n:"Salad Gotham Crunch",p:3.71,u:"each",o:"Hydro",g:"Gotham Greens NY"},{n:"Salad Gotham Spring Fam",p:6.70,u:"each",o:"Hydro",g:"Gotham Greens NY"},{n:"Salad Lancaster Arugula",p:4.62,u:"each",o:"Organic",g:"Lancaster PA"},{n:"Salad Lancaster Mix",p:4.62,u:"each",o:"Organic",g:"Lancaster PA"},{n:"Salad Lancaster Spicy",p:4.62,u:"each",o:"Organic",g:"Lancaster PA"},{n:"Salad Little Leaf Baby",p:3.31,u:"each",o:"Hydro",g:"Pennsylvania"},{n:"Salad OG Super Greens 5oz",p:3.87,u:"each",o:"Organic",g:"USA"},{n:"Salad OG Arugula 5oz",p:3.87,u:"each",o:"Organic",g:"USA"},{n:"Salad Untill Arugula",p:2.79,u:"each",o:"Hydro",g:"Massachusetts"},{n:"Salad Untill Cress/Arugula",p:2.79,u:"each",o:"Hydro",g:"Massachusetts"},{n:"Salad Untill Wild Medley",p:2.85,u:"each",o:"Hydro",g:"Massachusetts"},{n:"Salad Gotham Big Green",p:3.65,u:"each",o:"Hydro",g:"Gotham Greens NY"},{n:"Scallions",p:0.90,u:"/bunch",o:"Conv.",g:"Mexico"},{n:"Shallots",p:7.13,u:"/lb",o:"Organic",g:"Local 500mi"},{n:"Sorrel Loose",p:17.17,u:"/lb",o:"Organic",g:"Lancaster PA"},{n:"Spinach Baby Loose",p:10.31,u:"/lb",o:"Organic",g:"Local 500mi"},{n:"Spinach Winter",p:19.75,u:"/lb",o:"Organic",g:"Local 500mi"},{n:"Spinach Bunch",p:3.00,u:"/bunch",o:"Organic",g:"Local 500mi"},{n:"Spinach OG 16oz",p:6.75,u:"each",o:"Organic",g:"USA"},{n:"Spinach OG 5oz",p:3.87,u:"each",o:"Organic",g:"USA"},{n:"Sprouts Bean Mung",p:1.65,u:"/lb",o:"Conv.",g:"USA"},{n:"Sprouts Alfalfa",p:2.79,u:"each",o:"Organic",g:"USA"},{n:"Sprouts Broccoli",p:3.70,u:"each",o:"Organic",g:"Potomac Sprout MD"},{n:"Sprouts Crunchy Mix",p:3.67,u:"each",o:"Organic",g:"Local 500mi"},{n:"Sprouts Spicy Radish",p:2.79,u:"each",o:"Organic",g:"Local 500mi"},{n:"Sprouts Sunflower 4oz",p:4.14,u:"each",o:"Organic",g:"New York"},{n:"Squash Spaghetti",p:1.72,u:"/lb",o:"Organic",g:"Mexico"},{n:"Squash Acorn",p:1.72,u:"/lb",o:"Organic",g:"Mexico"},{n:"Squash Butternut Diced",p:3.87,u:"each",o:"Organic",g:"USA"},{n:"Squash Butternut",p:1.28,u:"/lb",o:"Organic",g:"Mexico/USA"},{n:"Squash Kabocha",p:1.66,u:"/lb",o:"Organic",g:"Mexico"},{n:"Squash Zucchini Green",p:2.58,u:"/lb",o:"Organic",g:"Mexico/USA"},{n:"Squash Delicata",p:1.66,u:"/lb",o:"Organic",g:"Mexico"},{n:"Strawberries 1lb",p:5.93,u:"each",o:"Organic",g:"Mexico"},{n:"Sweet Potato Garnet",p:2.07,u:"/lb",o:"Organic",g:"California"},{n:"Sweet Potato Japanese",p:3.07,u:"/lb",o:"Organic",g:"California"},{n:"Sweet Potato Jewel",p:2.07,u:"/lb",o:"Organic",g:"California"},{n:"Sweet Potato Local",p:1.88,u:"/lb",o:"Organic",g:"Lancaster PA"},{n:"Sweet Potato Purple",p:2.76,u:"/lb",o:"Organic",g:"California"},{n:"Tangelos Minneola",p:2.07,u:"/lb",o:"Organic",g:"California"},{n:"Tangerine/Clementine",p:2.32,u:"/lb",o:"Organic",g:"California"},{n:"Tomatillos",p:2.26,u:"/lb",o:"Conv.",g:"Mexico"},{n:"Tomato Cherry Little Guys",p:7.73,u:"each",o:"Organic",g:"Long Wind Farm VT"},{n:"Tomato Cherry on Vine",p:4.30,u:"each",o:"Organic",g:"Canada"},{n:"Tomato Cherry Sunset Bahama",p:5.32,u:"each",o:"Conv.",g:"Mexico/USA"},{n:"Tomato Cherry Sunset Flavor",p:5.04,u:"each",o:"Conv.",g:"Mexico/USA"},{n:"Tomato Cherry Sunset Honey",p:5.04,u:"each",o:"Conv.",g:"Mexico/USA"},{n:"Tomato Cherry Sunset Lolli",p:5.04,u:"each",o:"Conv.",g:"Mexico/USA"},{n:"Tomato Grape Sunripe",p:2.93,u:"each",o:"Conv.",g:"Mexico/USA"},{n:"Tomato Grape Organic",p:3.23,u:"each",o:"Organic",g:"Mexico"},{n:"Tomato Grape Sugar",p:5.04,u:"each",o:"Conv.",g:"Mexico"},{n:"Tomatoes Heirloom",p:4.98,u:"/lb",o:"Organic",g:"Florida"},{n:"Tomatoes Beefsteak",p:2.46,u:"/lb",o:"Organic",g:"Mexico"},{n:"Tomatoes Yellow/Orange",p:5.93,u:"/lb",o:"Conv.",g:"Guatemala"},{n:"Tomatoes on Vine",p:4.22,u:"/lb",o:"Organic",g:"Canada/Mexico/USA"},{n:"Tomatoes Plum",p:2.76,u:"/lb",o:"Organic",g:"Mexico/USA"},{n:"Turmeric",p:11.59,u:"/lb",o:"Organic",g:"Florida"},{n:"Turnips",p:2.80,u:"/lb",o:"Organic",g:"Local 500mi"},{n:"Watercress Loose",p:13.74,u:"/lb",o:"Organic",g:"Lancaster PA"},{n:"Wheatgrass 1lb Bag",p:17.07,u:"each",o:"Organic",g:"New York"},{n:"Wheatgrass Pot",p:2.96,u:"each",o:"Organic",g:"New York"},{n:"Yuca",p:1.47,u:"/lb",o:"Conv.",g:"Costa Rica"},{n:"Zucchini Baby Bag",p:3.23,u:"each",o:"Conv.",g:"Guatemala"},
];

const FTP = [
  {n:"Swiss Chard",p:3.49,u:"1 bunch",o:"Org. Grown",g:"Eagle Road Farm"},{n:"Baby Swiss Chard",p:4.99,u:"4 oz",o:"Organic",g:"Lancaster Farm Fresh"},{n:"Collard Greens",p:3.99,u:"1 bunch",o:"Organic",g:"Lady Moon Farms"},{n:"Green Kale",p:2.97,u:"1 bunch",o:"Organic",g:"Lady Moon Farms"},{n:"Red Kale",p:3.39,u:"1 bunch",o:"Organic",g:"Lady Moon Farms"},{n:"Lacinato Kale",p:3.82,u:"1 bunch",o:"Organic",g:"Lady Moon Farms"},{n:"Bunched Spinach",p:3.39,u:"1 bunch",o:"Organic",g:"C&B Farms"},{n:"Baby Spinach (frost-sweet)",p:6.99,u:"4 oz",o:"Organic",g:"Somewhere in Time Farm"},{n:"Baby Bok Choy",p:3.99,u:"1 head",o:"Organic",g:"Lady Moon Farms"},{n:"Baby Asian Greens",p:4.99,u:"4 oz",o:"Organic",g:"Lancaster Farm Fresh"},{n:"Red Frill Mustard",p:4.49,u:"4 oz",o:"Organic",g:"Sun Sprout Farm"},{n:"Dandelion Greens",p:3.99,u:"1 bunch",o:"Organic",g:"Lady Moon Farms"},{n:"Green Cabbage",p:3.29,u:"1 head",o:"Conv.",g:"Dagele Brothers"},{n:"Red Cabbage",p:4.99,u:"1 head",o:"Org. Grown",g:"Lady Moon Farms"},{n:"Napa Cabbage",p:4.99,u:"1 head",o:"Organic",g:"C&B Farms"},{n:"Savoy Cabbage",p:4.99,u:"1 head",o:"Organic",g:"Pete's Greens"},{n:"Brussels Sprouts",p:5.99,u:"12 oz",o:"Organic",g:"Grown in CA"},{n:"Lehigh Gold Potatoes",p:3.29,u:"1 lb",o:"Org. Grown",g:"Eagle Road Farm"},{n:"Yukon Gold Potatoes",p:4.99,u:"2 lb",o:"Conv.",g:"Dagele Brothers"},{n:"Russet Potatoes",p:3.99,u:"2 lb",o:"Organic",g:"Juniper Hill Farm"},{n:"Red Potatoes",p:2.99,u:"1 lb",o:"Org. Grown",g:"Eagle Road Farm"},{n:"Confetti Marble Potatoes",p:4.99,u:"1 lb",o:"Conv.",g:"Urban Roots"},{n:"Fingerling Potatoes",p:5.99,u:"1 lb",o:"Organic",g:"Finger Lakes Farms"},{n:"Fingerling Sweet Potatoes",p:4.49,u:"1 lb",o:"Org. Grown",g:"Eagle Road Farm"},{n:"Purple Sweet Potatoes",p:4.49,u:"2 pcs",o:"Organic",g:"New Sprout Organic"},{n:"Sweet Potatoes (org)",p:3.49,u:"2 pcs",o:"Organic",g:"Muzzarelli Farms"},{n:"Sweet Potatoes 3lb",p:7.99,u:"3 lb",o:"Organic",g:"Muzzarelli Farms"},{n:"Sweet Potatoes (conv)",p:2.99,u:"2 pcs",o:"Conv.",g:"Muzzarelli Farms"},{n:"Murasaki Sweet Potatoes",p:3.99,u:"2 pcs",o:"Conv.",g:"Muzzarelli Farms"},{n:"Celery",p:3.99,u:"1 head",o:"Organic",g:"C&B Farms"},{n:"Bunched Carrots",p:3.49,u:"1 bunch",o:"Organic",g:"C&B Farms"},{n:"Orange Carrots",p:3.49,u:"1 lb",o:"Organic",g:"Sun Sprout Farm"},{n:"Baby Orange Carrots",p:8.99,u:"1.5 lb",o:"Organic",g:"Pete's Greens"},{n:"Rainbow Carrots",p:4.99,u:"1 lb",o:"Organic",g:"Halal Pastures"},{n:"Butternut Squash",p:4.49,u:"1 piece",o:"Org. Grown",g:"Eagle Road Farm"},{n:"Spaghetti Squash",p:5.49,u:"2 pcs",o:"Organic",g:"FLX Farm Fresh"},{n:"Baby Butternut Squash",p:4.49,u:"2 pcs",o:"Conv.",g:"Sunny Harvest"},{n:"Tetsukabuto Squash",p:5.49,u:"1 squash",o:"Conv.",g:"Sunny Harvest"},{n:"Sunchokes",p:7.99,u:"1 lb",o:"Organic",g:"Sun Sprout Farm"},{n:"Red Radishes",p:2.99,u:"1 bunch",o:"Organic",g:"C&B Farms"},{n:"Watermelon Radishes",p:5.49,u:"1 lb",o:"Organic",g:"Lancaster Farm Fresh"},{n:"Chioggia Beets",p:4.99,u:"1 lb",o:"Organic",g:"Lancaster Farm Fresh"},{n:"Red Beets",p:3.49,u:"1 lb",o:"Organic",g:"Sun Sprout Farm"},{n:"Badger Flame Beets",p:5.49,u:"1 lb",o:"Organic",g:"Lancaster Farm Fresh"},{n:"Scarlet Queen Turnips",p:4.99,u:"1 lb",o:"Org. Grown",g:"Eagle Road Farm"},{n:"Red Beets (Eagle Rd)",p:3.99,u:"1 lb",o:"Org. Grown",g:"Eagle Road Farm"},{n:"Oca Tubers",p:5.99,u:"8 oz",o:"Conv.",g:"Girl & Dug Farm"},{n:"Purple Daikon",p:3.99,u:"1 lb",o:"Organic",g:"Sun Sprout Farm"},{n:"Green Meat Radishes",p:3.99,u:"1 lb",o:"Organic",g:"Halal Pastures"},{n:"Horseradish Root",p:5.99,u:"8 oz",o:"Conv.",g:"Grown in CA"},{n:"Broccoli Raab",p:4.49,u:"1 bunch",o:"Organic",g:"C&B Farms"},{n:"Broccoli Crown",p:3.99,u:"1 head",o:"Conv.",g:"Smith's Farm"},{n:"Broccoli Organic",p:3.99,u:"1 head",o:"Organic",g:"Grown in CA"},{n:"Broccolini",p:4.99,u:"1 bunch",o:"Organic",g:"Josie's Organics"},{n:"White Cauliflower",p:5.99,u:"1 head",o:"Organic",g:"Grown in CA"},{n:"Local Mushrooms Box",p:8.49,u:"box",o:"Various",g:"Farm to People"},{n:"Morel Mushrooms",p:14.99,u:"4 oz",o:"Conv.",g:"Tivoli Mushrooms"},{n:"Cremini Mushrooms",p:3.99,u:"8 oz",o:"Conv.",g:"Kennett Square"},{n:"Portobello Mushrooms",p:5.49,u:"10 oz",o:"Conv.",g:"Kennett Square"},{n:"Shiitake Mushrooms",p:5.49,u:"6 oz",o:"Conv.",g:"Kennett Square"},{n:"Chef's Mix Mushrooms",p:8.99,u:"8 oz",o:"Org. Grown",g:"Tivoli Mushrooms"},{n:"King Trumpet Mushrooms",p:8.99,u:"8 oz",o:"Org. Grown",g:"Tivoli Mushrooms"},{n:"Lion's Mane Mushrooms",p:8.99,u:"8 oz",o:"Org. Grown",g:"Tivoli Mushrooms"},{n:"Blue Oyster Mushrooms",p:8.99,u:"8 oz",o:"Org. Grown",g:"Tivoli Mushrooms"},{n:"Maitake Mushrooms",p:8.99,u:"8 oz",o:"Org. Grown",g:"Tivoli Mushrooms"},{n:"Pioppini Mushrooms",p:8.99,u:"8 oz",o:"Org. Grown",g:"Tivoli Mushrooms"},{n:"Yellow Oyster Mushrooms",p:8.99,u:"8 oz",o:"Org. Grown",g:"Tivoli Mushrooms"},{n:"Baby Spinach (frost)",p:6.99,u:"4 oz",o:"Organic",g:"Somewhere in Time"},{n:"5 Star Lettuce Mix",p:5.49,u:"4 oz",o:"Org. Grown",g:"Eagle Road Farm"},{n:"Mâche",p:5.99,u:"4 oz",o:"Organic",g:"Lancaster Farm Fresh"},{n:"Baby Kale (FLX)",p:4.99,u:"4 oz",o:"Org. Grown",g:"FLX Farm Fresh"},{n:"Baby Kale (Satur)",p:4.99,u:"5 oz",o:"Conv.",g:"Satur Farms"},{n:"Baby Spinach (Satur)",p:4.99,u:"5 oz",o:"Conv.",g:"Satur Farms"},{n:"Baby Arugula (Satur)",p:4.99,u:"5 oz",o:"Conv.",g:"Satur Farms"},{n:"Chioggia Radicchio",p:5.99,u:"1 head",o:"Organic",g:"Grown in CA"},{n:"Castelfranco Radicchio",p:6.99,u:"1 head",o:"Organic",g:"J. Marchini Farms"},{n:"Baby Spinach (Eagle Rd)",p:4.99,u:"4 oz",o:"Org. Grown",g:"Eagle Road Farm"},{n:"Romaine Lettuce (Gotham)",p:3.99,u:"4.5 oz",o:"Hydro",g:"Gotham Greens"},{n:"Baby Butterhead",p:3.99,u:"4.5 oz",o:"Hydro",g:"Gotham Greens"},{n:"Green Leaf Lettuce",p:2.99,u:"1 head",o:"Organic",g:"Lady Moon Farms"},{n:"Butterhead Lettuce",p:3.99,u:"4.5 oz",o:"Hydro",g:"Gotham Greens"},{n:"Romaine Hearts",p:5.99,u:"3 hearts",o:"Organic",g:"Lady Moon Farms"},{n:"Romaine Lettuce",p:3.49,u:"1 bunch",o:"Organic",g:"Lady Moon Farms"},{n:"Greenhouse Crunch",p:3.99,u:"4.5 oz",o:"Hydro",g:"Gotham Greens"},{n:"Kale Microgreens",p:5.99,u:"1.25 oz",o:"Organic",g:"Agrarian Feast"},{n:"Broccoli Microgreens",p:5.99,u:"1.25 oz",o:"Organic",g:"Agrarian Feast"},{n:"Pea Shoots",p:5.99,u:"3 oz",o:"Organic",g:"Agrarian Feast"},{n:"Sunflower Shoots",p:5.99,u:"3.25 oz",o:"Organic",g:"Agrarian Feast"},{n:"Gourmet Spring Mix",p:4.99,u:"4.5 oz",o:"Hydro",g:"Gotham Greens"},{n:"Heirloom Tomatoes",p:5.99,u:"2 pcs",o:"Organic",g:"GreenTown Farms"},{n:"Beefsteak Tomatoes",p:4.99,u:"2 pcs",o:"Conv.",g:"Backyard Farms"},{n:"Tomatoes on Vine",p:3.99,u:"3 pcs",o:"Conv.",g:"Backyard Farms"},{n:"Grape Tomatoes",p:5.99,u:"1 pint",o:"Organic",g:"C&B Farms"},{n:"Persian Cucumbers",p:4.99,u:"12 oz",o:"Organic",g:"Grown in Canada"},{n:"Slicing Cucumbers",p:3.99,u:"2 pcs",o:"Organic",g:"Grown in CA"},{n:"Green Zucchini (org)",p:5.99,u:"3 pcs",o:"Organic",g:"Grown in CA"},{n:"Green Zucchini (conv)",p:2.99,u:"2 pcs",o:"Conv.",g:"V&B Farms"},{n:"Yellow Squash",p:2.99,u:"2 pcs",o:"Conv.",g:"V&B Farms"},{n:"European Cucumber",p:3.99,u:"1 piece",o:"Organic",g:"Deep Root Organic"},{n:"Green Bell Peppers",p:3.99,u:"2 pcs",o:"Organic",g:"Grown in CA"},{n:"Red Bell Peppers",p:4.99,u:"2 pcs",o:"Organic",g:"Grown in Mexico"},{n:"Jalapeno Peppers",p:2.99,u:"5 pcs",o:"Organic",g:"Grown in CA"},{n:"Green Goddess Salad Kit",p:5.99,u:"6.5 oz",o:"Hydro",g:"Gotham Greens"},{n:"SW Ranch Salad Kit",p:5.99,u:"6.75 oz",o:"Hydro",g:"Gotham Greens"},{n:"Caesar Salad Kit",p:5.99,u:"6.6 oz",o:"Hydro",g:"Gotham Greens"},{n:"Hass Avocados",p:2.49,u:"1 piece",o:"Organic",g:"Organic from Mexico"},{n:"Fennel",p:4.99,u:"1 piece",o:"Organic",g:"County Line Harvest"},{n:"Italian Eggplant",p:3.99,u:"1 piece",o:"Organic",g:"Lady Moon Farms"},{n:"Green Beans",p:5.99,u:"12 oz",o:"Organic",g:"C&B Farms"},{n:"Asparagus",p:8.49,u:"~1 lb",o:"Conv.",g:"Delta Queen"},
  {n:"Garlic Organic",p:1.00,u:"1 head",o:"Organic",g:"Christopher Ranch"},{n:"Yellow Onions 1lb",p:1.79,u:"1 lb",o:"Conv.",g:"Dagele Brothers"},{n:"Yellow Onions 2lb",p:2.49,u:"2 lb",o:"Conv.",g:"Dagele Brothers"},{n:"Red Onions 1lb",p:2.99,u:"1 lb",o:"Conv.",g:"Dagele Brothers"},{n:"Red Onions 2lb",p:3.49,u:"2 lb",o:"Conv.",g:"Dagele Brothers"},{n:"Shallots",p:4.99,u:"1 lb",o:"Conv.",g:"Dagele Brothers"},{n:"Scallions",p:2.99,u:"1 bunch",o:"Org. Grown",g:"Eagle Road Farm"},{n:"Green Garlic",p:4.99,u:"2 pcs",o:"Organic",g:"Halal Pastures"},{n:"Leeks",p:5.99,u:"1 bunch",o:"Organic",g:"Grown in CA"},{n:"Sweet Onions",p:4.99,u:"2 pcs",o:"Conv.",g:"V&B Farms"},{n:"Ginger Organic",p:3.49,u:"4 oz",o:"Organic",g:"C&B Farms"},{n:"Turmeric Organic",p:4.99,u:"4 oz",o:"Organic",g:"Grown in Peru"},{n:"Cilantro",p:2.49,u:"1 bunch",o:"Organic",g:"C&B Farms"},{n:"Italian Parsley",p:2.49,u:"1 bunch",o:"Organic",g:"C&B Farms"},{n:"Curly Parsley",p:2.49,u:"1 bunch",o:"Organic",g:"C&B Farms"},{n:"Dill",p:2.99,u:"1 bunch",o:"Organic",g:"Lady Moon Farms"},{n:"Basil (Gotham)",p:3.99,u:"1.25 oz",o:"Hydro",g:"Gotham Greens"},{n:"Rosemary",p:2.99,u:"1 bunch",o:"Organic",g:"C&B Farms"},{n:"Thyme",p:3.49,u:"1 bunch",o:"Organic",g:"C&B Farms"},{n:"Mint",p:2.49,u:"1 bunch",o:"Organic",g:"C&B Farms"},{n:"Lemongrass",p:2.49,u:"2 stalks",o:"Org. Grown",g:"Eagle Road Farm"},
  {n:"Mixed Heirloom Apples",p:7.99,u:"3 lb",o:"Conv.",g:"Hurd Orchards"},{n:"Bulk Fuji Apples",p:6.99,u:"3 lb",o:"Conv.",g:"Hurd Orchards"},{n:"Bosc Pears",p:2.99,u:"2 pcs",o:"Conv.",g:"Migliorelli Farm"},{n:"D'Anjou Pears",p:2.99,u:"2 pcs",o:"Organic",g:"Bridges Produce"},{n:"Pink Lady Apples",p:4.99,u:"4 pcs",o:"Conv.",g:"Hurd Orchards"},{n:"Fuji Apples",p:2.99,u:"2 pcs",o:"Conv.",g:"Hurd Orchards"},{n:"Granny Smith Apples",p:2.99,u:"2 pcs",o:"Conv.",g:"Samascott Orchards"},{n:"Evercrisp Apples",p:3.99,u:"2 pcs",o:"Conv.",g:"Hurd Orchards"},{n:"Honeycrisp Apples",p:3.99,u:"2 pcs",o:"Conv.",g:"Migliorelli Farm"},{n:"Ruby Frost Apples",p:2.99,u:"2 pcs",o:"Conv.",g:"Hurd Orchards"},{n:"Winesap Apples",p:2.99,u:"2 pcs",o:"Conv.",g:"Migliorelli Farm"},{n:"Navel Oranges",p:5.99,u:"4 pcs",o:"Organic",g:"Lancaster Farm Fresh"},{n:"Cara Cara Oranges",p:5.99,u:"3 pcs",o:"Organic",g:"Grown in CA"},{n:"Blood Oranges",p:5.99,u:"4 pcs",o:"Organic",g:"Grown in CA"},{n:"Lemons",p:2.99,u:"3 pcs",o:"Organic",g:"Organic from Mexico"},{n:"Limes",p:2.49,u:"3 pcs",o:"Organic",g:"Organic from Mexico"},{n:"Grapefruit",p:3.99,u:"2 pcs",o:"Organic",g:"Lancaster Farm Fresh"},{n:"Bananas Organic",p:2.49,u:"2 lb",o:"Organic",g:"Organic from Mexico"},{n:"Strawberries Organic",p:7.99,u:"1 lb",o:"Organic",g:"Organic from Mexico"},{n:"Blueberries Organic",p:5.99,u:"6 oz",o:"Organic",g:"Driscoll's"},{n:"Raspberries Organic",p:6.99,u:"6 oz",o:"Organic",g:"Driscoll's"},{n:"Blackberries Organic",p:5.99,u:"6 oz",o:"Organic",g:"Driscoll's"},{n:"Red Seedless Grapes",p:6.99,u:"1.5 lb",o:"Conv.",g:"Global Fruit"},{n:"Gold Pineapple",p:6.99,u:"1 piece",o:"Organic",g:"Grown in Costa Rica"},{n:"Ataulfo Mangos",p:4.99,u:"2 pcs",o:"Organic",g:"Organic from Mexico"},{n:"Kiwi",p:4.99,u:"4 pcs",o:"Organic",g:"Organic from Mexico"},
];

const FD = [
  // VEGETABLES
  {n:"Organic Green Kale",p:2.99,u:"ea ~1lb",o:"Organic",g:""},{n:"Organic Lacinato Kale",p:2.99,u:"ea ~0.5lb",o:"Organic",g:""},{n:"Organic Red Kale",p:2.99,u:"ea",o:"Organic",g:""},{n:"Chopped Green Curly Kale",p:4.99,u:"ea ~8oz",o:"Conv.",g:""},{n:"Baby Kale",p:3.99,u:"ea ~5oz",o:"Organic",g:"Olivia's Organics"},{n:"Lancaster Organic Young Kale",p:4.49,u:"ea",o:"Organic",g:"Lancaster Farm Fresh"},{n:"AeroFarms Micro Kale",p:5.49,u:"ea ~2oz",o:"Conv.",g:"AeroFarms"},
  {n:"Organic Rainbow Swiss Chard",p:3.49,u:"ea ~1lb",o:"Organic",g:""},{n:"Organic Green Swiss Chard",p:3.49,u:"ea ~1lb",o:"Organic",g:""},{n:"Lancaster Organic Young Rainbow Chard",p:4.49,u:"ea ~5oz",o:"Organic",g:"Lancaster Farm Fresh"},
  {n:"Organic Collard Greens",p:2.99,u:"ea ~0.75lb",o:"Organic",g:""},{n:"Chopped Collard Greens",p:5.49,u:"ea ~5oz",o:"Conv.",g:""},{n:"Organic Mustard Greens",p:3.49,u:"ea ~0.5lb",o:"Organic",g:""},{n:"Organic Dandelion Greens",p:3.49,u:"ea ~8oz",o:"Organic",g:""},
  {n:"Baby Spinach (Olivia's)",p:3.99,u:"ea ~5oz",o:"Organic",g:"Olivia's Organics"},{n:"Baby Spinach (Olivia's 11oz)",p:5.99,u:"ea ~11oz",o:"Organic",g:"Olivia's Organics"},{n:"Baby Spinach (Satur)",p:3.99,u:"ea ~5oz",o:"Conv.",g:"Satur Farms"},{n:"Baby Spinach (Satur 10oz)",p:5.99,u:"ea ~10oz",o:"Conv.",g:"Satur Farms"},{n:"Spinach (Ocean Mist)",p:3.49,u:"ea ~10oz",o:"Conv.",g:"Ocean Mist"},{n:"Earthbound Organic Baby Spinach",p:6.99,u:"ea ~10oz",o:"Organic",g:"Earthbound Farm"},{n:"Lancaster Organic Young Spinach",p:4.49,u:"ea",o:"Organic",g:"Lancaster Farm Fresh"},{n:"organicgirl Baby Spinach",p:4.99,u:"ea ~5oz",o:"Organic",g:"organicgirl"},
  {n:"Baby Bok Choy (organic)",p:3.99,u:"/lb",o:"Organic",g:""},{n:"Shanghai Baby Bok Choy",p:3.99,u:"ea ~1lb bag",o:"Conv.",g:""},
  // CABBAGE
  {n:"Green Cabbage",p:0.99,u:"/lb",o:"Conv.",g:""},{n:"Organic Green Cabbage",p:1.99,u:"/lb",o:"Organic",g:""},{n:"Organic Red Cabbage",p:1.99,u:"/lb",o:"Organic",g:""},{n:"Napa Cabbage",p:2.99,u:"/lb",o:"Conv.",g:""},{n:"Savoy Cabbage",p:1.49,u:"/lb",o:"Conv.",g:""},
  // POTATOES
  {n:"Russet Potato",p:1.49,u:"/lb",o:"Conv.",g:""},{n:"Organic Russet Potato",p:2.99,u:"/lb",o:"Organic",g:""},{n:"Gold Potato",p:1.49,u:"/lb",o:"Conv.",g:""},{n:"Organic Gold Potato",p:2.99,u:"/lb",o:"Organic",g:""},{n:"Gold Potatoes 5lb bag",p:5.49,u:"ea ~5lb",o:"Conv.",g:""},{n:"Russet Potatoes 5lb bag",p:4.49,u:"ea ~5lb",o:"Conv.",g:""},{n:"Organic Mixed Creamer Potatoes",p:5.99,u:"ea ~24oz",o:"Organic",g:""},{n:"Creamer Potatoes Little Yellows",p:3.99,u:"ea ~1.5lb",o:"Conv.",g:"Little Potato Co"},
  // SWEET POTATOES
  {n:"Covington Sweet Potatoes",p:1.99,u:"/lb",o:"Conv.",g:""},{n:"Organic Garnet Sweet Potato",p:2.99,u:"/lb",o:"Organic",g:""},{n:"Organic Covington Sweet Potato",p:3.49,u:"/lb",o:"Organic",g:""},{n:"Organic Japanese Sweet Potatoes",p:3.49,u:"/lb",o:"Organic",g:""},{n:"Lancaster Organic Beauregard Sweet Potato",p:2.99,u:"/lb",o:"Organic",g:"Lancaster Farm Fresh"},
  // CARROTS
  {n:"Jumbo Carrots",p:1.49,u:"/lb",o:"Conv.",g:""},{n:"Organic Jumbo Carrots",p:2.99,u:"/lb",o:"Organic",g:"Cal-Organic"},{n:"Lancaster Organic Carrots",p:2.99,u:"/lb",o:"Organic",g:"Lancaster Farm Fresh"},{n:"Organic Baby Carrots",p:2.49,u:"ea ~1lb",o:"Organic",g:"Cal-Organic"},{n:"Organic Carrots 1lb bag",p:3.49,u:"ea ~1lb",o:"Organic",g:""},{n:"Organic Rainbow Carrots",p:4.99,u:"ea ~1lb",o:"Organic",g:"Cal-Organic"},{n:"Lancaster Purple Carrots",p:5.99,u:"ea ~2lb",o:"Organic",g:"Lancaster Farm Fresh"},{n:"Pete's Greens Rainbow Carrots",p:9.99,u:"ea",o:"Organic",g:"Pete's Greens"},
  // CELERY
  {n:"Celery (Ocean Mist)",p:4.99,u:"ea ~1lb",o:"Conv.",g:"Ocean Mist"},{n:"Organic Celery",p:5.99,u:"ea ~1lb",o:"Organic",g:""},{n:"Organic Celery Hearts",p:4.99,u:"ea 2ct",o:"Organic",g:""},
  // SQUASH
  {n:"Butternut Squash",p:1.99,u:"/lb",o:"Conv.",g:""},{n:"Spaghetti Squash",p:1.99,u:"/lb",o:"Conv.",g:""},{n:"Green Zucchini",p:1.99,u:"/lb",o:"Conv.",g:""},{n:"Organic Green Zucchini",p:2.99,u:"/lb",o:"Organic",g:""},{n:"Yellow Zucchini",p:2.99,u:"/lb",o:"Conv.",g:""},{n:"Baby Zucchini",p:3.99,u:"ea ~8oz",o:"Conv.",g:"Urban Roots"},
  // ROOTS
  {n:"Loose Beets",p:1.49,u:"/lb",o:"Conv.",g:""},{n:"Loose Organic Beets",p:3.49,u:"/lb",o:"Organic",g:""},{n:"Organic Gold Beets",p:3.49,u:"/lb",o:"Organic",g:""},{n:"Lancaster Organic Badger Flame Beets",p:3.49,u:"/lb",o:"Organic",g:"Lancaster Farm Fresh"},{n:"Lancaster Organic Chioggia Beets",p:3.49,u:"ea ~0.5lb",o:"Organic",g:"Lancaster Farm Fresh"},{n:"Organic Beets Bunch",p:3.99,u:"ea ~1lb",o:"Organic",g:""},{n:"Organic Red Radish",p:2.99,u:"ea ~1lb",o:"Organic",g:""},{n:"Radishes (conv)",p:1.99,u:"ea ~0.5lb",o:"Conv.",g:""},{n:"Lancaster Organic Watermelon Radishes",p:2.49,u:"ea ~0.5lb",o:"Organic",g:"Lancaster Farm Fresh"},{n:"Organic Daikon Bunch",p:2.99,u:"/lb",o:"Organic",g:""},{n:"Horseradish",p:5.99,u:"/lb",o:"Conv.",g:""},{n:"Jerusalem Artichokes",p:5.99,u:"/lb",o:"Organic",g:"Lancaster Farm Fresh"},{n:"Radicchio",p:4.99,u:"ea",o:"Conv.",g:""},
  // BROCCOLI & CAULIFLOWER
  {n:"Broccoli Crowns",p:1.99,u:"ea ~0.6lb",o:"Conv.",g:""},{n:"Organic Broccoli Crowns",p:2.99,u:"/lb",o:"Organic",g:""},{n:"Organic Broccoli",p:4.49,u:"ea ~1lb",o:"Organic",g:""},{n:"Broccoli (Ocean Mist)",p:3.99,u:"ea ~2lb",o:"Conv.",g:"Ocean Mist"},{n:"Broccoli Rabe",p:3.99,u:"ea ~1lb",o:"Conv.",g:""},{n:"Organic Broccolette",p:5.99,u:"ea ~0.5lb",o:"Organic",g:""},{n:"Cauliflower (Ocean Mist)",p:5.99,u:"ea ~1.5lb",o:"Conv.",g:"Ocean Mist"},{n:"Organic Cauliflower",p:6.49,u:"ea ~1.5lb",o:"Organic",g:""},{n:"Orange Cauliflower",p:5.99,u:"ea ~1.5lb",o:"Conv.",g:""},{n:"Purple Cauliflower",p:5.99,u:"ea ~1.5lb",o:"Conv.",g:""},
  // MUSHROOMS
  {n:"Baby Bella (Cremini) 8oz",p:2.99,u:"ea 8oz",o:"Conv.",g:""},{n:"Organic Baby Bella 8oz",p:3.49,u:"ea 8oz",o:"Organic",g:""},{n:"Sliced Baby Bella 8oz",p:2.49,u:"ea 8oz",o:"Conv.",g:""},{n:"Sliced Organic Baby Bella 8oz",p:3.49,u:"ea 8oz",o:"Organic",g:""},{n:"White Button Mushrooms 8oz",p:2.99,u:"ea 8oz",o:"Conv.",g:""},{n:"Organic White Mushrooms 8oz",p:3.49,u:"ea 8oz",o:"Organic",g:""},{n:"Organic Shiitake 3.5oz",p:4.49,u:"ea 3.5oz",o:"Organic",g:""},{n:"Mushroom King Org Shiitake 8oz",p:7.99,u:"ea 8oz",o:"Organic",g:"Mushroom King"},{n:"Mushroom King Org Shiitake 4oz",p:5.99,u:"ea 4oz",o:"Organic",g:"Mushroom King"},{n:"Mushroom King Org Maitake",p:5.99,u:"ea",o:"Organic",g:"Mushroom King"},{n:"Mushroom King Org Lion's Mane",p:7.99,u:"ea",o:"Organic",g:"Mushroom King"},{n:"Royal Trumpet 4oz",p:4.49,u:"ea 4oz",o:"Conv.",g:""},{n:"Mushroom King Org King Trumpet 4oz",p:5.99,u:"ea 4oz",o:"Organic",g:"Mushroom King"},{n:"Oyster Mushrooms 3.5oz",p:2.99,u:"ea 3.5oz",o:"Conv.",g:""},{n:"Organic Gourmet Mushroom Blend 4oz",p:3.99,u:"ea 4oz",o:"Organic",g:""},{n:"Mushroom King Org Asian Blend 8oz",p:7.99,u:"ea 8oz",o:"Organic",g:"Mushroom King"},{n:"Steak Cut Mushrooms 8oz",p:2.99,u:"ea 8oz",o:"Conv.",g:""},
  // LETTUCE & SALAD
  {n:"Organic Romaine",p:3.49,u:"ea head",o:"Organic",g:""},{n:"Romaine Hearts (Ocean Mist)",p:4.99,u:"3ct ~1.5lb",o:"Conv.",g:"Ocean Mist"},{n:"Organic Romaine Hearts",p:6.49,u:"3ct ~1.5lb",o:"Organic",g:""},{n:"Artisan Romaine",p:3.79,u:"2ct ~0.92lb",o:"Conv.",g:"Tanimura & Antle"},{n:"Organic Red Leaf Lettuce",p:2.99,u:"ea ~0.5lb",o:"Organic",g:""},{n:"Organic Boston Lettuce",p:2.99,u:"ea",o:"Organic",g:""},{n:"Iceberg Lettuce",p:4.49,u:"ea ~0.75lb",o:"Conv.",g:"Ocean Mist"},{n:"Organic Iceberg Lettuce",p:3.99,u:"ea",o:"Organic",g:""},{n:"Gotham Greens Butterhead",p:2.99,u:"ea ~4.5oz",o:"Hydro",g:"Gotham Greens"},{n:"Gotham Greens Brooklyn Crunch",p:2.99,u:"ea ~4.5oz",o:"Hydro",g:"Gotham Greens"},{n:"Gotham Greens Baby Butterhead",p:3.99,u:"ea ~4.5oz",o:"Hydro",g:"Gotham Greens"},{n:"Gotham Greens Lettuce Mix Family",p:6.49,u:"ea ~9oz",o:"Hydro",g:"Gotham Greens"},{n:"Lancaster Organic Mixed Lettuce",p:4.49,u:"ea ~5oz",o:"Organic",g:"Lancaster Farm Fresh"},{n:"Lancaster Organic Baby Butter Lettuce",p:4.49,u:"ea ~5oz",o:"Organic",g:"Lancaster Farm Fresh"},{n:"Earthbound Organic Sweet Baby Lettuces",p:5.49,u:"ea ~5oz",o:"Organic",g:"Earthbound Farm"},{n:"Blue Moon Organic Micro Greens",p:9.99,u:"ea ~4oz",o:"Organic",g:"Blue Moon Acres"},{n:"AeroFarms Micro Broccoli",p:5.49,u:"ea ~2oz",o:"Conv.",g:"AeroFarms"},{n:"Blue Moon Organic Micro Radish",p:4.49,u:"ea ~1oz",o:"Organic",g:"Blue Moon Acres"},
  // CUCUMBERS
  {n:"Mini Seedless Cucumbers",p:3.99,u:"ea ~14oz",o:"Conv.",g:""},{n:"Organic Mini Seedless Cucumbers",p:4.49,u:"ea ~1lb",o:"Organic",g:""},{n:"Greenhouse Cucumber",p:2.99,u:"ea ~12oz",o:"Conv.",g:""},{n:"Organic Greenhouse Cucumber",p:3.49,u:"ea ~12oz",o:"Organic",g:""},{n:"Green Cucumber",p:1.49,u:"ea ~7oz",o:"Conv.",g:""},{n:"Organic Green Cucumber",p:2.49,u:"ea ~7oz",o:"Organic",g:""},
  // EGGPLANT
  {n:"Eggplant",p:2.99,u:"/lb",o:"Conv.",g:""},{n:"Organic Eggplant",p:3.99,u:"/lb",o:"Organic",g:""},{n:"Italian Eggplant",p:4.99,u:"/lb",o:"Conv.",g:""},{n:"Chinese Eggplant",p:4.99,u:"/lb",o:"Conv.",g:""},{n:"Graffiti Eggplant",p:4.99,u:"ea ~0.5lb",o:"Conv.",g:""},
  // PEPPERS
  {n:"Green Bell Pepper",p:2.99,u:"/lb",o:"Conv.",g:""},{n:"Organic Green Bell Pepper",p:2.99,u:"/lb",o:"Organic",g:""},{n:"Red Greenhouse Bell Pepper",p:3.99,u:"/lb",o:"Conv.",g:""},{n:"Organic Red Greenhouse Bell Pepper",p:5.99,u:"/lb",o:"Organic",g:""},{n:"Orange Greenhouse Bell Pepper",p:3.99,u:"/lb",o:"Conv.",g:""},{n:"Yellow Greenhouse Bell Pepper",p:3.99,u:"/lb",o:"Conv.",g:""},{n:"Organic Sweet Mini Bell Peppers",p:5.49,u:"ea ~8oz",o:"Organic",g:""},{n:"Rainbow Pepper Pack",p:5.99,u:"3ct ~1.3lb",o:"Conv.",g:""},{n:"Organic Rainbow Pepper Pack",p:8.19,u:"3ct ~1.3lb",o:"Organic",g:""},{n:"Jalapeño Pepper",p:0.49,u:"/ea",o:"Conv.",g:""},
  // TOMATOES
  {n:"Tomatoes on Vine",p:3.99,u:"/lb",o:"Conv.",g:""},{n:"Organic Tomatoes on Vine",p:4.49,u:"/lb",o:"Organic",g:""},{n:"Beefsteak Tomatoes Large",p:2.99,u:"/lb",o:"Conv.",g:""},{n:"Organic Red Beefsteak Tomato",p:4.49,u:"/lb",o:"Organic",g:""},{n:"Long Wind Farms Organic Beefsteak",p:6.99,u:"/lb",o:"Organic",g:"Long Wind Farm"},{n:"Fair Trade Organic Heirloom Tomatoes",p:6.99,u:"/lb",o:"Organic",g:""},{n:"Grape Tomatoes",p:3.49,u:"ea ~10oz",o:"Conv.",g:""},{n:"Organic Grape Tomatoes",p:4.99,u:"ea ~12oz",o:"Organic",g:""},{n:"Sunset Angel Sweet Grape Tomatoes",p:3.99,u:"ea ~12oz",o:"Conv.",g:"Sunset"},{n:"Sunset Wild Wonders Tomatoes",p:4.99,u:"ea ~12oz",o:"Conv.",g:"Sunset"},{n:"Sunset Lolli Bombs",p:5.99,u:"ea ~12oz",o:"Conv.",g:"Sunset"},
  // BEANS & PEAS
  {n:"Green Beans Bag",p:2.99,u:"ea ~12oz",o:"Conv.",g:""},{n:"Trimmed French Beans",p:4.99,u:"ea ~8oz",o:"Conv.",g:""},{n:"Sugar Snap Peas",p:6.99,u:"ea ~12oz",o:"Conv.",g:""},{n:"Snow Peas",p:6.99,u:"ea ~8oz",o:"Conv.",g:""},{n:"English Peas Shelled",p:3.99,u:"ea ~6oz",o:"Conv.",g:""},{n:"Chinese Long Beans",p:7.99,u:"ea ~1lb",o:"Conv.",g:""},
  // ASPARAGUS
  {n:"Jumbo Asparagus",p:6.99,u:"ea ~1lb",o:"Conv.",g:""},
  // ONIONS & ALLIUMS
  {n:"Jumbo Yellow Onion",p:0.99,u:"/lb",o:"Conv.",g:""},{n:"Lancaster Organic Yellow Onion",p:1.99,u:"/lb",o:"Organic",g:"Lancaster Farm Fresh"},{n:"Lancaster Organic Yellow Onions 2lb",p:4.99,u:"ea ~2lb",o:"Organic",g:"Lancaster Farm Fresh"},{n:"Sweet Onion",p:1.49,u:"/lb",o:"Conv.",g:""},{n:"Lancaster Organic Sweet Onion",p:2.49,u:"/lb",o:"Organic",g:"Lancaster Farm Fresh"},{n:"Red Onion Large",p:1.99,u:"/lb",o:"Conv.",g:""},{n:"Lancaster Organic Red Onions",p:2.49,u:"/lb",o:"Organic",g:"Lancaster Farm Fresh"},{n:"White Onion Large",p:1.49,u:"/lb",o:"Conv.",g:""},{n:"Scallions",p:1.99,u:"ea ~6oz",o:"Conv.",g:""},{n:"Garlic 3ct",p:3.49,u:"ea ~3.2oz",o:"Conv.",g:""},{n:"Organic Garlic 3ct",p:3.99,u:"ea ~2.4oz",o:"Organic",g:""},{n:"Peeled Garlic",p:4.99,u:"ea ~8oz",o:"Conv.",g:""},{n:"Organic Ginger Root",p:3.49,u:"ea ~6oz",o:"Organic",g:""},
  // HERBS
  {n:"Cilantro",p:1.99,u:"ea ~4oz",o:"Conv.",g:""},{n:"Organic Cilantro",p:2.99,u:"ea ~4oz",o:"Organic",g:""},{n:"Organic Cilantro (small)",p:2.49,u:"ea ~0.5oz",o:"Organic",g:""},{n:"Italian Parsley",p:1.49,u:"ea ~4oz",o:"Conv.",g:""},{n:"Dill",p:2.49,u:"ea",o:"Conv.",g:""},{n:"Mint",p:2.49,u:"ea ~2oz",o:"Conv.",g:""},{n:"Goodness Gardens Parsley/Dill/Chive Trio",p:4.49,u:"ea ~2oz",o:"Conv.",g:"Goodness Gardens"},{n:"Goodness Gardens Chive/Mint/Parsley Trio",p:4.49,u:"ea ~2oz",o:"Conv.",g:"Goodness Gardens"},
  // FRUITS
  {n:"Banana Bunch",p:1.69,u:"ea bunch",o:"Conv.",g:""},{n:"Fair Trade Organic Bananas",p:2.99,u:"ea bunch",o:"Organic",g:"Equal Exchange"},{n:"Baby Bananas Bunch",p:4.99,u:"ea bunch",o:"Conv.",g:""},{n:"Hass Avocados 2ct",p:5.49,u:"2ct ~1lb",o:"Conv.",g:""},{n:"Lemons",p:0.89,u:"/ea",o:"Conv.",g:""},{n:"Limes",p:0.59,u:"/ea",o:"Conv.",g:""},{n:"Navel Oranges",p:1.49,u:"/ea",o:"Conv.",g:""},{n:"Organic Navel Oranges",p:1.99,u:"/ea",o:"Organic",g:""},{n:"Mandarin Clementines",p:5.99,u:"ea bag",o:"Conv.",g:""},{n:"Gala Apples",p:1.99,u:"/lb",o:"Conv.",g:""},{n:"Honeycrisp Apples",p:3.49,u:"/lb",o:"Conv.",g:""},{n:"Organic Honeycrisp Apples",p:3.99,u:"/lb",o:"Organic",g:""},{n:"Granny Smith Apples",p:1.99,u:"/lb",o:"Conv.",g:""},{n:"Fuji Apples",p:1.99,u:"/lb",o:"Conv.",g:""},{n:"Organic Fuji Apples",p:2.99,u:"/lb",o:"Organic",g:""},{n:"Bosc Pears",p:2.49,u:"/lb",o:"Conv.",g:""},{n:"Anjou Pears",p:1.99,u:"/lb",o:"Conv.",g:""},{n:"Korean Jumbo Pear",p:4.99,u:"ea ~1lb",o:"Conv.",g:"Evergreen Farm"},{n:"Green Seedless Grapes",p:4.99,u:"/lb ~2lb",o:"Conv.",g:""},{n:"Red Seedless Grapes",p:4.99,u:"/lb ~2lb",o:"Conv.",g:""},{n:"Organic Strawberries",p:7.99,u:"ea ~16oz",o:"Organic",g:"Driscoll's"},{n:"Strawberries",p:4.99,u:"ea ~16oz",o:"Conv.",g:"Driscoll's"},{n:"Organic Raspberries",p:6.99,u:"ea ~6oz",o:"Organic",g:"Driscoll's"},{n:"Raspberries",p:3.99,u:"ea ~6oz",o:"Conv.",g:""},{n:"Raspberries (Driscoll's)",p:4.99,u:"ea ~6oz",o:"Conv.",g:"Driscoll's"},{n:"Organic Blueberries",p:6.49,u:"ea ~6oz",o:"Organic",g:"Driscoll's"},{n:"Blueberries",p:4.49,u:"ea ~6oz",o:"Conv.",g:""},{n:"Blackberries",p:3.99,u:"ea ~6oz",o:"Conv.",g:""},{n:"Organic Blackberries",p:5.99,u:"ea ~6oz",o:"Organic",g:"Driscoll's"},{n:"Gold Pineapple",p:6.99,u:"ea ~3lb",o:"Conv.",g:""},{n:"Mini Honeyglow Pineapple",p:6.99,u:"ea ~3lb",o:"Conv.",g:""},{n:"Ataulfo Mangos",p:2.49,u:"/ea",o:"Conv.",g:""},{n:"Organic Ataulfo Mangos",p:2.99,u:"/ea",o:"Organic",g:""},{n:"Oishii Strawberry Bento",p:3.99,u:"ea",o:"Conv.",g:"Oishii"},
];

// ═══════════════ COMPARISON DATA ═══════════════
const DATA = [
  // GREENS — all exact, no norm needed
  {cat:"Greens",product:"Green Kale (bunch)",psfc:1.78,psfcUnit:"/bunch",psfcOrg:"org",ftp:2.97,ftpUnit:"/bunch",ftpOrg:"org",fd:2.99,fdUnit:"ea ~1lb",fdOrg:"org",unitMatch:"exact",note:"FTP on sale from $3.49"},
  {cat:"Greens",product:"Lacinato Kale (bunch)",psfc:2.08,psfcUnit:"/bunch",psfcOrg:"org",ftp:3.82,ftpUnit:"/bunch",ftpOrg:"org",fd:2.99,fdUnit:"ea ~0.5lb",fdOrg:"org",unitMatch:"exact",note:"FTP on sale from $4.49"},
  {cat:"Greens",product:"Red Kale (bunch)",psfc:2.23,psfcUnit:"/bunch",psfcOrg:"org",ftp:3.39,ftpUnit:"/bunch",ftpOrg:"org",fd:2.99,fdUnit:"ea",fdOrg:"org",unitMatch:"exact",note:"FTP on sale from $3.99"},
  {cat:"Greens",product:"Swiss Chard (bunch)",psfc:2.37,psfcUnit:"/bunch",psfcOrg:"org",ftp:3.49,ftpUnit:"/bunch",ftpOrg:"og",fd:3.49,fdUnit:"ea ~1lb",fdOrg:"org",unitMatch:"exact",note:""},
  {cat:"Greens",product:"Collard Greens (bunch)",psfc:2.29,psfcUnit:"/bunch",psfcOrg:"org",ftp:3.99,ftpUnit:"/bunch",ftpOrg:"org",fd:2.99,fdUnit:"ea ~0.75lb",fdOrg:"org",unitMatch:"exact",note:""},
  {cat:"Greens",product:"Bunched Spinach",psfc:3.00,psfcUnit:"/bunch",psfcOrg:"org",ftp:3.39,ftpUnit:"/bunch",ftpOrg:"org",fd:null,fdUnit:"—",fdOrg:null,unitMatch:"exact",note:"FTP on sale from $3.99"},
  {cat:"Greens",product:"Baby Spinach (~5oz)",psfc:3.87,psfcUnit:"ea 5oz",psfcOrg:"org",ftp:4.99,ftpUnit:"5oz",ftpOrg:"conv",fd:4.49,fdUnit:"ea ~5oz",fdOrg:"org",unitMatch:"close",psfcNorm:0.77,ftpNorm:1.00,fdNorm:0.90,normUnit:"/oz",note:"Satur (FTP) vs Olivia's (FD)"},
  {cat:"Greens",product:"Baby Bok Choy",psfc:3.18,psfcUnit:"/lb",psfcOrg:"org",ftp:3.99,ftpUnit:"1 head",ftpOrg:"org",fd:null,fdUnit:"—",fdOrg:null,unitMatch:"diff",note:"lb vs head"},
  {cat:"Greens",product:"Dandelion Greens",psfc:2.85,psfcUnit:"/bunch",psfcOrg:"org",ftp:3.99,ftpUnit:"/bunch",ftpOrg:"org",fd:3.49,fdUnit:"ea ~8oz",fdOrg:"org",unitMatch:"exact",note:""},
  {cat:"Cabbage",product:"Green Cabbage",psfc:1.28,psfcUnit:"/lb",psfcOrg:"org",ftp:3.29,ftpUnit:"1 head",ftpOrg:"conv",fd:0.99,fdUnit:"/lb",fdOrg:"conv",unitMatch:"diff",note:"FD conv $0.99/lb; org $1.99/lb"},
  {cat:"Cabbage",product:"Napa Cabbage",psfc:2.29,psfcUnit:"/lb",psfcOrg:"org",ftp:4.99,ftpUnit:"1 head",ftpOrg:"org",fd:2.99,fdUnit:"/lb",fdOrg:"conv",unitMatch:"diff",note:"lb vs head"},
  {cat:"Cabbage",product:"Brussels Sprouts",psfc:2.34,psfcUnit:"ea bag",psfcOrg:"org",ftp:5.99,ftpUnit:"12oz",ftpOrg:"org",fd:null,fdUnit:"—",fdOrg:null,unitMatch:"close",psfcNorm:2.34,ftpNorm:5.99,normUnit:"/~12oz bag",note:"Both bagged organic, ~12oz"},
  {cat:"Potatoes",product:"Gold/Yukon Potatoes",psfc:1.21,psfcUnit:"/lb",psfcOrg:"org",ftp:3.29,ftpUnit:"/lb",ftpOrg:"og",fd:1.49,fdUnit:"/lb",fdOrg:"conv",unitMatch:"exact",note:"FD conv $1.49/lb; org $2.99/lb"},
  {cat:"Potatoes",product:"Russet Potatoes",psfc:1.21,psfcUnit:"/lb",psfcOrg:"org",ftp:2.00,ftpUnit:"/lb",ftpOrg:"org",fd:1.49,fdUnit:"/lb",fdOrg:"conv",unitMatch:"exact",note:"FD conv $1.49/lb; org $2.99/lb"},
  {cat:"Potatoes",product:"Red Potatoes",psfc:2.01,psfcUnit:"/lb",psfcOrg:"org",ftp:2.99,ftpUnit:"/lb",ftpOrg:"og",fd:null,fdUnit:"—",fdOrg:null,unitMatch:"exact",note:""},
  {cat:"Potatoes",product:"Fingerling Potatoes",psfc:3.18,psfcUnit:"/lb",psfcOrg:"org",ftp:5.99,ftpUnit:"/lb",ftpOrg:"org",fd:null,fdUnit:"—",fdOrg:null,unitMatch:"exact",note:""},
  {cat:"Potatoes",product:"Sweet Potatoes (orange)",psfc:2.07,psfcUnit:"/lb",psfcOrg:"org",ftp:3.49,ftpUnit:"2 pcs",ftpOrg:"org",fd:1.99,fdUnit:"/lb",fdOrg:"conv",unitMatch:"diff",note:"FD conv $1.99/lb; org $2.99/lb"},
  {cat:"Potatoes",product:"Purple Sweet Potatoes",psfc:2.76,psfcUnit:"/lb",psfcOrg:"org",ftp:4.49,ftpUnit:"2 pcs",ftpOrg:"org",fd:3.49,fdUnit:"/lb",fdOrg:"org",unitMatch:"diff",note:"lb vs pieces"},
  {cat:"Carrots",product:"Orange Carrots (loose)",psfc:2.51,psfcUnit:"/lb",psfcOrg:"org",ftp:3.49,ftpUnit:"/lb",ftpOrg:"org",fd:1.49,fdUnit:"/lb",fdOrg:"conv",unitMatch:"exact",note:"FD conv $1.49/lb; org $2.99/lb"},
  {cat:"Carrots",product:"Baby Carrots (1lb bag)",psfc:1.80,psfcUnit:"ea 1lb",psfcOrg:"org",ftp:null,ftpUnit:"—",ftpOrg:null,fd:2.49,fdUnit:"ea ~1lb",fdOrg:"org",unitMatch:"exact",note:"Cal-Organic at FD"},
  {cat:"Carrots",product:"Bunched Carrots",psfc:1.80,psfcUnit:"ea 1lb",psfcOrg:"org",ftp:3.49,ftpUnit:"1 bunch",ftpOrg:"org",fd:null,fdUnit:"—",fdOrg:null,unitMatch:"close",note:"1lb bag vs bunch — similar quantity"},
  {cat:"Carrots",product:"Rainbow Carrots",psfc:2.36,psfcUnit:"ea 12oz",psfcOrg:"org",ftp:4.99,ftpUnit:"/lb",ftpOrg:"org",fd:4.99,fdUnit:"ea ~1lb",fdOrg:"org",unitMatch:"close",psfcNorm:3.15,ftpNorm:4.99,normUnit:"/lb",note:"PSFC 12oz=$2.36 → $3.15/lb"},
  {cat:"Carrots",product:"Celery",psfc:1.62,psfcUnit:"/lb",psfcOrg:"org",ftp:3.99,ftpUnit:"1 head",ftpOrg:"org",fd:null,fdUnit:"—",fdOrg:null,unitMatch:"diff",note:"lb vs head"},
  {cat:"Squash",product:"Butternut Squash",psfc:1.28,psfcUnit:"/lb",psfcOrg:"org",ftp:4.49,ftpUnit:"1 piece",ftpOrg:"og",fd:1.99,fdUnit:"/lb",fdOrg:"conv",unitMatch:"diff",note:"FTP per piece; PSFC/FD per lb"},
  {cat:"Squash",product:"Spaghetti Squash",psfc:1.72,psfcUnit:"/lb",psfcOrg:"org",ftp:5.49,ftpUnit:"2 pcs",ftpOrg:"org",fd:null,fdUnit:"—",fdOrg:null,unitMatch:"diff",note:"lb vs pieces"},
  {cat:"Squash",product:"Green Zucchini",psfc:2.58,psfcUnit:"/lb",psfcOrg:"org",ftp:5.99,ftpUnit:"3 pcs",ftpOrg:"org",fd:1.99,fdUnit:"/lb",fdOrg:"conv",unitMatch:"diff",note:"FD conv $1.99/lb; org $2.99/lb"},
  {cat:"Roots",product:"Red Beets",psfc:2.13,psfcUnit:"/lb",psfcOrg:"org",ftp:3.49,ftpUnit:"/lb",ftpOrg:"org",fd:1.49,fdUnit:"/lb",fdOrg:"conv",unitMatch:"exact",note:"FD conv $1.49/lb; org $3.49/lb"},
  {cat:"Roots",product:"Chioggia Beets",psfc:2.26,psfcUnit:"/lb",psfcOrg:"org",ftp:4.99,ftpUnit:"/lb",ftpOrg:"org",fd:3.49,fdUnit:"ea ~0.5lb",fdOrg:"org",unitMatch:"exact",note:"Lancaster org at FD"},
  {cat:"Roots",product:"Red Radishes (bunch)",psfc:2.44,psfcUnit:"/bunch",psfcOrg:"org",ftp:2.99,ftpUnit:"/bunch",ftpOrg:"org",fd:1.99,fdUnit:"ea ~0.5lb",fdOrg:"conv",unitMatch:"exact",note:"FD conv $1.99; org $2.99/ea ~1lb"},
  {cat:"Roots",product:"Watermelon Radish",psfc:2.55,psfcUnit:"/lb",psfcOrg:"org",ftp:5.49,ftpUnit:"/lb",ftpOrg:"org",fd:2.49,fdUnit:"ea ~0.5lb",fdOrg:"org",unitMatch:"exact",note:"Lancaster org at FD"},
  {cat:"Roots",product:"Purple Daikon",psfc:1.86,psfcUnit:"/lb",psfcOrg:"org",ftp:3.99,ftpUnit:"/lb",ftpOrg:"org",fd:2.99,fdUnit:"/lb",fdOrg:"org",unitMatch:"exact",note:""},
  {cat:"Roots",product:"Turnips",psfc:2.80,psfcUnit:"/lb",psfcOrg:"org",ftp:4.99,ftpUnit:"/lb",ftpOrg:"og",fd:null,fdUnit:"—",fdOrg:null,unitMatch:"exact",note:""},
  {cat:"Roots",product:"Sunchokes",psfc:6.36,psfcUnit:"/lb",psfcOrg:"org",ftp:7.99,ftpUnit:"/lb",ftpOrg:"org",fd:5.99,fdUnit:"/lb",fdOrg:"org",unitMatch:"exact",note:"All organic, all per lb"},
  {cat:"Roots",product:"Horseradish",psfc:4.92,psfcUnit:"/lb",psfcOrg:"conv",ftp:5.99,ftpUnit:"8oz",ftpOrg:"conv",fd:5.99,fdUnit:"/lb",fdOrg:"conv",unitMatch:"close",psfcNorm:4.92,ftpNorm:11.98,fdNorm:5.99,normUnit:"/lb",note:"FTP 8oz=$5.99 → $11.98/lb"},
  {cat:"Broccoli/Cauliflower",product:"Broccoli Crown",psfc:2.53,psfcUnit:"/lb",psfcOrg:"org",ftp:3.99,ftpUnit:"1 head",ftpOrg:"org",fd:1.99,fdUnit:"ea ~0.6lb",fdOrg:"conv",unitMatch:"diff",note:"PSFC/FTP organic; FD conventional"},
  {cat:"Broccoli/Cauliflower",product:"Organic Broccoli",psfc:2.53,psfcUnit:"/lb",psfcOrg:"org",ftp:3.99,ftpUnit:"1 head",ftpOrg:"org",fd:4.49,fdUnit:"ea ~1lb",fdOrg:"org",unitMatch:"close",psfcNorm:2.53,ftpNorm:3.99,fdNorm:4.49,normUnit:"/~1lb head",note:"FD on sale from $4.99; head ≈ 1lb"},
  {cat:"Broccoli/Cauliflower",product:"Broccoli Rabe",psfc:2.76,psfcUnit:"/bunch",psfcOrg:"org",ftp:4.49,ftpUnit:"/bunch",ftpOrg:"org",fd:3.99,fdUnit:"ea ~1lb",fdOrg:"conv",unitMatch:"exact",note:""},
  {cat:"Broccoli/Cauliflower",product:"Broccolini",psfc:3.12,psfcUnit:"/bunch",psfcOrg:"org",ftp:4.99,ftpUnit:"/bunch",ftpOrg:"org",fd:5.99,fdUnit:"ea ~0.5lb",fdOrg:"org",unitMatch:"exact",note:"Organic Broccolette at FD"},
  {cat:"Broccoli/Cauliflower",product:"Cauliflower",psfc:2.82,psfcUnit:"/lb",psfcOrg:"org",ftp:5.99,ftpUnit:"1 head",ftpOrg:"org",fd:5.99,fdUnit:"ea ~1.5lb",fdOrg:"conv",unitMatch:"diff",note:"FD conv $5.99; org $6.49"},
  {cat:"Mushrooms",product:"Cremini",psfc:5.15,psfcUnit:"/lb",psfcOrg:"org",ftp:3.99,ftpUnit:"8oz",ftpOrg:"conv",fd:2.99,fdUnit:"8oz",fdOrg:"conv",unitMatch:"close",psfcNorm:5.15,ftpNorm:7.98,fdNorm:5.98,normUnit:"/lb",note:"FD conv $2.99/8oz; org $3.49/8oz"},
  {cat:"Mushrooms",product:"Portobello",psfc:5.41,psfcUnit:"/lb",psfcOrg:"org",ftp:5.49,ftpUnit:"10oz",ftpOrg:"conv",fd:null,fdUnit:"—",fdOrg:null,unitMatch:"close",psfcNorm:5.41,ftpNorm:8.78,normUnit:"/lb",note:"PSFC organic; FTP conventional"},
  {cat:"Mushrooms",product:"Shiitake",psfc:8.80,psfcUnit:"/lb",psfcOrg:"org",ftp:5.49,ftpUnit:"6oz",ftpOrg:"conv",fd:4.49,fdUnit:"3.5oz",fdOrg:"org",unitMatch:"close",psfcNorm:8.80,ftpNorm:14.64,fdNorm:20.51,normUnit:"/lb",note:"Org shiitake; also Mushroom King 8oz $7.99"},
  {cat:"Mushrooms",product:"Lion's Mane",psfc:14.17,psfcUnit:"/lb",psfcOrg:"org",ftp:8.99,ftpUnit:"8oz",ftpOrg:"og",fd:7.99,fdUnit:"ea",fdOrg:"org",unitMatch:"close",psfcNorm:14.17,ftpNorm:17.98,fdNorm:15.98,normUnit:"/lb",note:"Mushroom King Organic"},
  {cat:"Mushrooms",product:"Maitake",psfc:19.32,psfcUnit:"/lb",psfcOrg:"org",ftp:8.99,ftpUnit:"8oz",ftpOrg:"og",fd:5.99,fdUnit:"ea",fdOrg:"org",unitMatch:"close",psfcNorm:19.32,ftpNorm:17.98,fdNorm:11.98,normUnit:"/lb",note:"Mushroom King Organic"},
  {cat:"Mushrooms",product:"King Trumpet",psfc:17.13,psfcUnit:"/lb",psfcOrg:"org",ftp:8.99,ftpUnit:"8oz",ftpOrg:"og",fd:4.49,fdUnit:"4oz",fdOrg:"conv",unitMatch:"close",psfcNorm:17.13,ftpNorm:17.98,fdNorm:17.96,normUnit:"/lb",note:"FD conv $4.49/4oz; org $5.99/4oz"},
  {cat:"Mushrooms",product:"Morels",psfc:46.36,psfcUnit:"/lb",psfcOrg:"conv",ftp:14.99,ftpUnit:"4oz",ftpOrg:"conv",fd:null,fdUnit:"—",fdOrg:null,unitMatch:"close",psfcNorm:46.36,ftpNorm:59.96,normUnit:"/lb",note:"Both conventional"},
  {cat:"Lettuce",product:"Romaine Lettuce",psfc:2.29,psfcUnit:"/head",psfcOrg:"org",ftp:3.49,ftpUnit:"/head",ftpOrg:"org",fd:3.49,fdUnit:"/head",fdOrg:"org",unitMatch:"exact",note:"FD on sale"},
  {cat:"Lettuce",product:"Romaine Hearts (3ct)",psfc:4.19,psfcUnit:"ea 3ct",psfcOrg:"org",ftp:5.99,ftpUnit:"3 hearts",ftpOrg:"org",fd:4.99,fdUnit:"ea 3ct",fdOrg:"conv",unitMatch:"exact",note:"FD conventional; on sale"},
  {cat:"Lettuce",product:"Organic Romaine Hearts",psfc:4.19,psfcUnit:"ea 3ct",psfcOrg:"org",ftp:5.99,ftpUnit:"3 hearts",ftpOrg:"org",fd:6.49,fdUnit:"ea 3ct",fdOrg:"org",unitMatch:"exact",note:"All organic"},
  {cat:"Lettuce",product:"Green Leaf Lettuce",psfc:2.31,psfcUnit:"/head",psfcOrg:"org",ftp:2.99,ftpUnit:"/head",ftpOrg:"org",fd:null,fdUnit:"—",fdOrg:null,unitMatch:"exact",note:""},
  {cat:"Lettuce",product:"Iceberg Lettuce",psfc:3.54,psfcUnit:"/head",psfcOrg:"org",ftp:null,ftpUnit:"—",ftpOrg:null,fd:3.99,fdUnit:"/head",fdOrg:"org",unitMatch:"exact",note:""},
  {cat:"Lettuce",product:"Spring Mix (Gotham)",psfc:6.70,psfcUnit:"ea ~9oz",psfcOrg:"hydro",ftp:4.99,ftpUnit:"4.5oz",ftpOrg:"hydro",fd:6.49,fdUnit:"ea ~9oz",fdOrg:"hydro",unitMatch:"close",psfcNorm:0.74,ftpNorm:1.11,fdNorm:0.72,normUnit:"/oz",note:"FTP 4.5oz vs PSFC/FD ~9oz"},
  {cat:"Lettuce",product:"Microgreens Salad",psfc:5.14,psfcUnit:"ea ~1.25oz",psfcOrg:"org",ftp:5.99,ftpUnit:"1.25oz",ftpOrg:"org",fd:9.99,fdUnit:"ea ~4oz",fdOrg:"org",unitMatch:"close",psfcNorm:4.11,ftpNorm:4.79,fdNorm:2.50,normUnit:"/oz",note:"FD 4oz is better value/oz"},
  {cat:"Cucumbers",product:"Mini/Persian Cucumbers",psfc:3.90,psfcUnit:"/lb",psfcOrg:"conv",ftp:4.99,ftpUnit:"12oz",ftpOrg:"org",fd:3.99,fdUnit:"ea ~14oz",fdOrg:"conv",unitMatch:"close",psfcNorm:3.90,ftpNorm:6.65,fdNorm:4.56,normUnit:"/lb",note:"FTP organic; PSFC & FD conv"},
  {cat:"Cucumbers",product:"Org Mini Cucumbers",psfc:null,psfcUnit:"—",psfcOrg:null,ftp:4.99,ftpUnit:"12oz",ftpOrg:"org",fd:4.49,fdUnit:"ea ~1lb",fdOrg:"org",unitMatch:"close",ftpNorm:6.65,fdNorm:4.49,normUnit:"/lb",note:"Both organic; FD bigger pack"},
  {cat:"Cucumbers",product:"European Cucumber",psfc:3.98,psfcUnit:"/ea",psfcOrg:"org",ftp:3.99,ftpUnit:"/ea",ftpOrg:"org",fd:2.99,fdUnit:"/ea",fdOrg:"conv",unitMatch:"exact",note:"FD conv $2.99; org $3.49"},
  {cat:"Eggplant",product:"Eggplant",psfc:2.66,psfcUnit:"/lb",psfcOrg:"org",ftp:3.99,ftpUnit:"1 piece",ftpOrg:"org",fd:2.99,fdUnit:"/lb",fdOrg:"conv",unitMatch:"diff",note:"FD conv $2.99/lb; org $3.99/lb"},
  {cat:"Eggplant",product:"Italian Eggplant",psfc:2.66,psfcUnit:"/lb",psfcOrg:"org",ftp:3.99,ftpUnit:"1 piece",ftpOrg:"org",fd:4.99,fdUnit:"/lb",fdOrg:"conv",unitMatch:"diff",note:"FTP per piece"},
  {cat:"Peppers",product:"Green Bell Peppers",psfc:3.38,psfcUnit:"/lb",psfcOrg:"org",ftp:3.99,ftpUnit:"2 pcs",ftpOrg:"org",fd:2.99,fdUnit:"/lb",fdOrg:"conv",unitMatch:"diff",note:"FD conv $2.99/lb; org also $2.99/lb"},
  {cat:"Peppers",product:"Red Bell Peppers",psfc:6.00,psfcUnit:"/lb",psfcOrg:"org",ftp:4.99,ftpUnit:"2 pcs",ftpOrg:"org",fd:3.99,fdUnit:"/lb",fdOrg:"conv",unitMatch:"diff",note:"FD conv $3.99/lb; org $5.99/lb"},
  {cat:"Tomatoes",product:"Heirloom Tomatoes",psfc:4.98,psfcUnit:"/lb",psfcOrg:"org",ftp:5.99,ftpUnit:"2 pcs",ftpOrg:"org",fd:6.99,fdUnit:"/lb",fdOrg:"org",unitMatch:"diff",note:"Fair Trade Organic Heirloom at FD"},
  {cat:"Tomatoes",product:"Beefsteak Tomatoes",psfc:2.46,psfcUnit:"/lb",psfcOrg:"org",ftp:4.99,ftpUnit:"2 pcs",ftpOrg:"conv",fd:2.99,fdUnit:"/lb",fdOrg:"conv",unitMatch:"diff",note:"FD conv $2.99/lb; org $4.49/lb"},
  {cat:"Tomatoes",product:"Grape Tomatoes",psfc:3.23,psfcUnit:"/pint",psfcOrg:"org",ftp:5.99,ftpUnit:"/pint",ftpOrg:"org",fd:3.49,fdUnit:"ea ~10oz",fdOrg:"conv",unitMatch:"exact",note:"FD conv $3.49/10oz; org $4.99/12oz"},
  {cat:"Beans/Peas",product:"Green Beans (~12oz)",psfc:4.36,psfcUnit:"ea ~12oz",psfcOrg:"org",ftp:5.99,ftpUnit:"12oz",ftpOrg:"org",fd:2.99,fdUnit:"ea ~12oz",fdOrg:"conv",unitMatch:"exact",note:"FD conventional; PSFC/FTP organic"},
  {cat:"Beans/Peas",product:"Sugar Snap Peas",psfc:3.84,psfcUnit:"/lb",psfcOrg:"conv",ftp:null,ftpUnit:"—",ftpOrg:null,fd:6.99,fdUnit:"ea ~12oz",fdOrg:"conv",unitMatch:"diff",note:"lb vs package"},
  {cat:"Beans/Peas",product:"Asparagus (~1lb)",psfc:5.84,psfcUnit:"/lb",psfcOrg:"org",ftp:8.49,ftpUnit:"~1lb",ftpOrg:"conv",fd:6.99,fdUnit:"ea ~1lb",fdOrg:"conv",unitMatch:"close",psfcNorm:5.84,ftpNorm:8.49,fdNorm:6.99,normUnit:"/~1lb",note:"PSFC organic; FTP & FD conventional"},
  {cat:"Alliums",product:"Yellow Onion",psfc:1.13,psfcUnit:"/lb",psfcOrg:"org",ftp:1.79,ftpUnit:"/lb",ftpOrg:"conv",fd:0.99,fdUnit:"/lb",fdOrg:"conv",unitMatch:"exact",note:"PSFC organic; FTP & FD conv"},
  {cat:"Alliums",product:"Red Onions",psfc:1.63,psfcUnit:"/lb",psfcOrg:"org",ftp:2.99,ftpUnit:"/lb",ftpOrg:"conv",fd:1.99,fdUnit:"/lb",fdOrg:"conv",unitMatch:"exact",note:"FD conv $1.99/lb; org $2.49/lb"},
  {cat:"Alliums",product:"Shallots",psfc:7.13,psfcUnit:"/lb",psfcOrg:"org",ftp:4.99,ftpUnit:"/lb",ftpOrg:"conv",fd:null,fdUnit:"—",fdOrg:null,unitMatch:"exact",note:"PSFC organic; FTP conventional"},
  {cat:"Alliums",product:"Scallions",psfc:0.90,psfcUnit:"/bunch",psfcOrg:"conv",ftp:2.99,ftpUnit:"/bunch",ftpOrg:"og",fd:1.99,fdUnit:"ea ~6oz",fdOrg:"conv",unitMatch:"close",psfcNorm:0.90,ftpNorm:2.99,fdNorm:1.99,normUnit:"/bunch",note:"FTP org grown; bunch ≈ 6oz"},
  {cat:"Alliums",product:"Garlic",psfc:5.67,psfcUnit:"/lb",psfcOrg:"org",ftp:1.00,ftpUnit:"/head",ftpOrg:"org",fd:3.49,fdUnit:"ea 3ct",fdOrg:"conv",unitMatch:"diff",note:"FD conv $3.49/3ct; org $3.99/3ct"},
  {cat:"Alliums",product:"Ginger (organic)",psfc:2.37,psfcUnit:"/lb",psfcOrg:"org",ftp:3.49,ftpUnit:"4oz",ftpOrg:"org",fd:3.49,fdUnit:"ea ~6oz",fdOrg:"org",unitMatch:"close",psfcNorm:2.37,ftpNorm:13.96,normUnit:"/lb",note:"FTP 4oz=$3.49 → $13.96/lb"},
  {cat:"Alliums",product:"Leeks",psfc:2.72,psfcUnit:"/lb",psfcOrg:"org",ftp:5.99,ftpUnit:"1 bunch",ftpOrg:"org",fd:null,fdUnit:"—",fdOrg:null,unitMatch:"diff",note:"lb vs bunch"},
  {cat:"Herbs",product:"Cilantro",psfc:1.55,psfcUnit:"/bunch",psfcOrg:"org",ftp:2.49,ftpUnit:"/bunch",ftpOrg:"org",fd:1.99,fdUnit:"ea ~4oz",fdOrg:"conv",unitMatch:"exact",note:"FD conv $1.99; org $2.49-2.99"},
  {cat:"Herbs",product:"Italian Parsley",psfc:1.98,psfcUnit:"/bunch",psfcOrg:"org",ftp:2.49,ftpUnit:"/bunch",ftpOrg:"org",fd:1.49,fdUnit:"ea ~4oz",fdOrg:"conv",unitMatch:"exact",note:""},
  {cat:"Herbs",product:"Dill",psfc:2.58,psfcUnit:"/bunch",psfcOrg:"org",ftp:2.99,ftpUnit:"/bunch",ftpOrg:"org",fd:2.49,fdUnit:"ea",fdOrg:"conv",unitMatch:"exact",note:""},
  {cat:"Herbs",product:"Rosemary",psfc:2.04,psfcUnit:"ea cup",psfcOrg:"org",ftp:2.99,ftpUnit:"/bunch",ftpOrg:"org",fd:null,fdUnit:"—",fdOrg:null,unitMatch:"close",note:"Cup vs bunch — approximate"},
  {cat:"Herbs",product:"Thyme",psfc:4.08,psfcUnit:"ea cup",psfcOrg:"org",ftp:3.49,ftpUnit:"/bunch",ftpOrg:"org",fd:null,fdUnit:"—",fdOrg:null,unitMatch:"close",note:"Cup vs bunch — FTP appears cheaper"},
  {cat:"Herbs",product:"Mint",psfc:1.03,psfcUnit:"ea cup",psfcOrg:"org",ftp:2.49,ftpUnit:"/bunch",ftpOrg:"org",fd:2.49,fdUnit:"ea ~2oz",fdOrg:"conv",unitMatch:"close",note:"Cup vs bunch — approximate"},
  {cat:"Herbs",product:"Basil",psfc:2.04,psfcUnit:"ea .75oz",psfcOrg:"org",ftp:3.99,ftpUnit:"1.25oz",ftpOrg:"hydro",fd:null,fdUnit:"—",fdOrg:null,unitMatch:"close",psfcNorm:2.72,ftpNorm:3.19,normUnit:"/oz",note:"PSFC .75oz, FTP 1.25oz"},
  {cat:"Salad Kits",product:"Caesar Kit (Gotham)",psfc:4.59,psfcUnit:"/ea 6.6oz",psfcOrg:"hydro",ftp:5.99,ftpUnit:"6.6oz",ftpOrg:"hydro",fd:null,fdUnit:"—",fdOrg:null,unitMatch:"exact",note:"Same brand & size"},
  {cat:"Salad Kits",product:"Goddess Kit (Gotham)",psfc:4.59,psfcUnit:"/ea 6.5oz",psfcOrg:"hydro",ftp:5.99,ftpUnit:"6.5oz",ftpOrg:"hydro",fd:null,fdUnit:"—",fdOrg:null,unitMatch:"exact",note:"Same brand & size"},
  {cat:"Specialty",product:"Hass Avocado",psfc:2.95,psfcUnit:"/lb",psfcOrg:"org",ftp:2.49,ftpUnit:"1 piece",ftpOrg:"org",fd:5.49,fdUnit:"2ct ~1lb",fdOrg:"conv",unitMatch:"diff",note:"All different units"},
  {cat:"Specialty",product:"Fennel",psfc:4.51,psfcUnit:"/ea",psfcOrg:"org",ftp:4.99,ftpUnit:"/ea",ftpOrg:"org",fd:null,fdUnit:"—",fdOrg:null,unitMatch:"exact",note:""},
  {cat:"Apples",product:"Honeycrisp",psfc:2.40,psfcUnit:"/lb",psfcOrg:"ipm",ftp:3.99,ftpUnit:"2 pcs",ftpOrg:"conv",fd:3.49,fdUnit:"/lb",fdOrg:"conv",unitMatch:"diff",note:"FD conv $3.49/lb; org $3.99/lb"},
  {cat:"Apples",product:"Pink Lady",psfc:1.89,psfcUnit:"/lb",psfcOrg:"ipm",ftp:4.99,ftpUnit:"4 pcs",ftpOrg:"conv",fd:null,fdUnit:"—",fdOrg:null,unitMatch:"diff",note:""},
  {cat:"Apples",product:"Granny Smith",psfc:2.47,psfcUnit:"/lb",psfcOrg:"org",ftp:2.99,ftpUnit:"2 pcs",ftpOrg:"conv",fd:1.99,fdUnit:"/lb",fdOrg:"conv",unitMatch:"diff",note:"PSFC organic; FTP conv"},
  {cat:"Citrus",product:"Navel Oranges",psfc:1.85,psfcUnit:"/lb",psfcOrg:"org",ftp:5.99,ftpUnit:"4 pcs",ftpOrg:"org",fd:1.99,fdUnit:"/ea",fdOrg:"org",unitMatch:"diff",note:"lb vs pieces"},
  {cat:"Citrus",product:"Blood Oranges",psfc:2.77,psfcUnit:"/lb",psfcOrg:"org",ftp:5.99,ftpUnit:"4 pcs",ftpOrg:"org",fd:null,fdUnit:"—",fdOrg:null,unitMatch:"diff",note:""},
  {cat:"Citrus",product:"Lemons",psfc:1.94,psfcUnit:"/lb",psfcOrg:"org",ftp:2.99,ftpUnit:"3 pcs",ftpOrg:"org",fd:0.89,fdUnit:"/ea",fdOrg:"conv",unitMatch:"diff",note:"All different units; FD conv"},
  {cat:"Citrus",product:"Limes",psfc:3.21,psfcUnit:"/lb",psfcOrg:"org",ftp:2.49,ftpUnit:"3 pcs",ftpOrg:"org",fd:0.59,fdUnit:"/ea",fdOrg:"conv",unitMatch:"diff",note:"lb vs pieces"},
  {cat:"Citrus",product:"Grapefruit",psfc:1.86,psfcUnit:"/lb",psfcOrg:"org",ftp:3.99,ftpUnit:"2 pcs",ftpOrg:"org",fd:null,fdUnit:"—",fdOrg:null,unitMatch:"diff",note:""},
  {cat:"Citrus",product:"Clementines",psfc:2.32,psfcUnit:"/lb",psfcOrg:"org",ftp:null,ftpUnit:"—",ftpOrg:null,fd:5.99,fdUnit:"ea bag",fdOrg:"conv",unitMatch:"diff",note:"lb vs bag; FD conv"},
  {cat:"Berries",product:"Strawberries (1lb)",psfc:5.93,psfcUnit:"ea 1lb",psfcOrg:"org",ftp:7.99,ftpUnit:"1 lb",ftpOrg:"org",fd:7.99,fdUnit:"ea ~16oz",fdOrg:"org",unitMatch:"exact",note:"All organic, all ~1lb"},
  {cat:"Berries",product:"Raspberries (6oz)",psfc:4.83,psfcUnit:"ea 6oz",psfcOrg:"org",ftp:6.99,ftpUnit:"6oz",ftpOrg:"org",fd:6.99,fdUnit:"ea ~6oz",fdOrg:"org",unitMatch:"exact",note:"All organic, all 6oz"},
  {cat:"Berries",product:"Blackberries (6oz)",psfc:4.86,psfcUnit:"ea 6oz",psfcOrg:"org",ftp:5.99,ftpUnit:"6oz",ftpOrg:"org",fd:5.99,fdUnit:"ea ~6oz",fdOrg:"org",unitMatch:"exact",note:"Both organic"},
  {cat:"Berries",product:"Grapes (seedless)",psfc:null,psfcUnit:"—",psfcOrg:null,ftp:6.99,ftpUnit:"1.5lb",ftpOrg:"conv",fd:4.99,fdUnit:"/lb ~2lb",fdOrg:"conv",unitMatch:"close",ftpNorm:4.66,fdNorm:4.99,normUnit:"/lb",note:"Both conv; FTP 1.5lb=$6.99"},
  {cat:"Tropical",product:"Bananas (organic)",psfc:0.99,psfcUnit:"/lb",psfcOrg:"org",ftp:2.49,ftpUnit:"2lb",ftpOrg:"org",fd:2.99,fdUnit:"ea bunch",fdOrg:"org",unitMatch:"close",psfcNorm:0.99,ftpNorm:1.25,normUnit:"/lb",note:"All organic; FD bunch not convertible"},
  {cat:"Tropical",product:"Pineapple (gold)",psfc:5.73,psfcUnit:"/ea",psfcOrg:"org",ftp:6.99,ftpUnit:"/ea",ftpOrg:"org",fd:6.99,fdUnit:"ea ~3lb",fdOrg:"conv",unitMatch:"exact",note:"PSFC/FTP organic; FD conv"},
  {cat:"Tropical",product:"Ataulfo Mangos",psfc:2.67,psfcUnit:"/lb",psfcOrg:"org",ftp:4.99,ftpUnit:"2 pcs",ftpOrg:"org",fd:2.49,fdUnit:"/ea",fdOrg:"conv",unitMatch:"diff",note:"FD conv $2.49/ea; org $2.99/ea"},
  {cat:"Tropical",product:"Kiwi",psfc:0.70,psfcUnit:"/ea",psfcOrg:"org",ftp:4.99,ftpUnit:"4 pcs",ftpOrg:"org",fd:null,fdUnit:"—",fdOrg:null,unitMatch:"close",psfcNorm:0.70,ftpNorm:1.25,normUnit:"/ea",note:"Both organic; FTP 4pk=$4.99"},
  {cat:"Pears",product:"Bosc Pears",psfc:2.14,psfcUnit:"/lb",psfcOrg:"org",ftp:2.99,ftpUnit:"2 pcs",ftpOrg:"conv",fd:2.49,fdUnit:"/lb",fdOrg:"conv",unitMatch:"diff",note:"PSFC organic per lb; FTP conv per piece"},
  {cat:"Pears",product:"D'Anjou Pears",psfc:2.14,psfcUnit:"/lb",psfcOrg:"org",ftp:2.99,ftpUnit:"2 pcs",ftpOrg:"org",fd:1.99,fdUnit:"/lb",fdOrg:"conv",unitMatch:"diff",note:"lb vs pieces"},
];

const ORG_LABELS = { org: "Organic", og: "Org. Grown", conv: "Conv.", ipm: "IPM", hydro: "Hydro" };
const ORG_COLORS = { org: "#22c55e", og: "#86efac", conv: "#a1a1aa", ipm: "#facc15", hydro: "#38bdf8" };
const UNIT_COLORS = { exact: "#22c55e", close: "#facc15", diff: "#ef4444" };
const RC = { PSFC: "#3b82f6", FTP: "#10b981", FD: "#f97316" };
const CATS = [...new Set(DATA.map(d => d.cat))];

function getP(row, who) {
  if (who === "psfc") return row.psfcNorm ?? row.psfc;
  if (who === "ftp") return row.ftpNorm ?? row.ftp;
  if (who === "fd") return row.fdNorm ?? row.fd;
  return null;
}
function getWinner(row) {
  if (row.unitMatch === "diff") return null;
  const p = [{ n:"PSFC", v:getP(row,"psfc") },{ n:"FTP", v:getP(row,"ftp") },{ n:"FD", v:getP(row,"fd") }].filter(x => x.v != null);
  if (!p.length) return null;
  p.sort((a,b) => a.v - b.v);
  return p[0].n;
}
function OrgBadge({ org }) {
  if (!org) return <span style={{ color:"#27272a", fontSize:9 }}>—</span>;
  return <span style={{ display:"inline-block", padding:"1px 5px", borderRadius:4, fontSize:8, fontWeight:600, background:ORG_COLORS[org]+"22", color:ORG_COLORS[org], border:`1px solid ${ORG_COLORS[org]}33`, whiteSpace:"nowrap", lineHeight:"14px" }}>{ORG_LABELS[org]}</span>;
}
function UnitBadge({ match, normUnit }) {
  const label = match === "exact" ? "✓ Same" : match === "close" ? (normUnit ? `≈ ${normUnit}` : "≈ Similar") : "✗ Diff";
  return <span style={{ display:"inline-block", padding:"1px 5px", borderRadius:4, fontSize:8, fontWeight:600, background:UNIT_COLORS[match]+"18", color:UNIT_COLORS[match], whiteSpace:"nowrap", lineHeight:"14px" }}>{label}</span>;
}
function PriceCell({ raw, norm, unit, isWinner, color }) {
  const hasNorm = norm != null && raw != null && Math.abs(norm - raw) > 0.005;
  const display = norm ?? raw;
  if (display == null) return <td style={{ padding:"6px 4px", textAlign:"center", color:"#27272a", fontFamily:"'JetBrains Mono', monospace", fontSize:11 }}>—</td>;
  return (
    <td style={{ padding:"6px 4px", textAlign:"center", background:isWinner ? color+"12" : "transparent", lineHeight:1.3 }}>
      <div style={{ fontWeight:700, fontFamily:"'JetBrains Mono', monospace", fontSize:12, color:isWinner ? color : "#a1a1aa" }}>${display.toFixed(2)}</div>
      {hasNorm && <div style={{ fontSize:9, color:"#52525b", fontFamily:"'JetBrains Mono', monospace" }}>(${raw.toFixed(2)} {unit})</div>}
    </td>
  );
}

function RetailerList({ data, search, color, name }) {
  const [sort, setSort] = useState("name");
  const filtered = useMemo(() => {
    let items = data;
    if (search) items = items.filter(d => d.n.toLowerCase().includes(search.toLowerCase()) || (d.g||"").toLowerCase().includes(search.toLowerCase()));
    if (sort === "name") items = [...items].sort((a,b) => a.n.localeCompare(b.n));
    else if (sort === "price_asc") items = [...items].sort((a,b) => a.p - b.p);
    else if (sort === "price_desc") items = [...items].sort((a,b) => b.p - a.p);
    else if (sort === "origin") items = [...items].sort((a,b) => (a.g||"").localeCompare(b.g||""));
    return items;
  }, [data, search, sort]);
  const orgC = {"Organic":"#22c55e","Org. Grown":"#86efac","Conv.":"#a1a1aa","IPM":"#facc15","Hydro":"#38bdf8","Hydroponic":"#38bdf8","Non-GMO":"#c084fc","Pest. Free":"#86efac","Min. Treated":"#facc15","Various":"#71717a"};
  return (
    <div>
      <div style={{ padding:"8px 24px", display:"flex", gap:8, alignItems:"center", borderBottom:"1px solid #1c1c22", background:"#0c0c0f" }}>
        <span style={{ fontSize:12, color, fontWeight:700 }}>{name}</span>
        <span style={{ fontSize:11, color:"#52525b" }}>·</span>
        <span style={{ fontSize:11, color:"#52525b" }}>{filtered.length} items</span>
        <select value={sort} onChange={e=>setSort(e.target.value)} style={{ marginLeft:"auto", background:"#111114", border:"1px solid #27272a", borderRadius:6, padding:"4px 8px", color:"#e4e4e7", fontSize:11, fontFamily:"'DM Sans',sans-serif" }}>
          <option value="name">Sort: Name</option>
          <option value="price_asc">Sort: Price ↑</option>
          <option value="price_desc">Sort: Price ↓</option>
          <option value="origin">Sort: Origin/Farm</option>
        </select>
      </div>
      <div style={{ overflowX:"auto", padding:"0 24px 24px" }}>
        <table style={{ width:"100%", borderCollapse:"collapse", marginTop:4, fontSize:11 }}>
          <thead><tr>
            {["Product","Price","Unit","Organic","Origin / Farm"].map((h,i) => (
              <th key={i} style={{ textAlign:i>0&&i<4?"center":"left", padding:"8px 6px", color:"#52525b", fontWeight:600, fontSize:9, textTransform:"uppercase", letterSpacing:0.8, borderBottom:"1px solid #1c1c22", fontFamily:"'JetBrains Mono',monospace", position:"sticky", top:0, background:"#09090b", zIndex:1 }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {filtered.map((item,i) => (
              <tr key={i} style={{ background:i%2===0?"#0c0c0f":"#09090b" }}>
                <td style={{ padding:"6px", fontWeight:500, color:"#fafafa" }}>{item.n}</td>
                <td style={{ padding:"6px", textAlign:"center", fontWeight:700, fontFamily:"'JetBrains Mono',monospace", fontSize:12, color }}>${item.p.toFixed(2)}</td>
                <td style={{ padding:"6px", textAlign:"center", color:"#71717a", fontSize:10 }}>{item.u}</td>
                <td style={{ padding:"6px", textAlign:"center" }}>
                  <span style={{ display:"inline-block", padding:"1px 5px", borderRadius:4, fontSize:8, fontWeight:600, background:(orgC[item.o]||"#71717a")+"22", color:orgC[item.o]||"#71717a", lineHeight:"14px" }}>{item.o}</span>
                </td>
                <td style={{ padding:"6px", color:"#52525b", fontSize:10 }}>{item.g}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ═══════════════ WEEKLY BASKET ═══════════════
// Common weekly produce basket items with qty in comparable units
const BASKET = [
  {item:"Bananas",qty:2,unit:"lb",psfc:0.99,ftp:1.25,fdOrg:null,fdConv:null,pOrg:"org",fOrg:"org",note:"FTP $2.49/2lb"},
  {item:"Baby Spinach 5oz",qty:2,unit:"pk",psfc:3.87,ftp:4.99,fdOrg:3.99,fdConv:3.99,pOrg:"org",fOrg:"conv",note:""},
  {item:"Carrots 1lb bag",qty:1,unit:"bag",psfc:1.80,ftp:3.49,fdOrg:3.49,fdConv:null,pOrg:"org",fOrg:"org",note:"FTP bunch"},
  {item:"Broccoli ~1lb",qty:1,unit:"head",psfc:2.53,ftp:3.99,fdOrg:4.49,fdConv:1.99,pOrg:"org",fOrg:"org",note:"PSFC /lb ~1lb head"},
  {item:"Onion Yellow 2lb",qty:1,unit:"2lb",psfc:2.26,ftp:2.49,fdOrg:3.98,fdConv:1.98,pOrg:"org",fOrg:"conv",note:"2x /lb price"},
  {item:"Potatoes Gold 2lb",qty:1,unit:"2lb",psfc:2.42,ftp:6.58,fdOrg:5.98,fdConv:2.98,pOrg:"org",fOrg:"og",note:"2x /lb price"},
  {item:"Garlic 1 head",qty:1,unit:"head",psfc:0.47,ftp:1.00,fdOrg:1.33,fdConv:1.16,pOrg:"org",fOrg:"org",note:"PSFC $5.67/lb÷12"},
  {item:"Avocados 2ct",qty:1,unit:"2ct",psfc:null,ftp:4.98,fdOrg:null,fdConv:5.49,pOrg:null,fOrg:"org",note:"PSFC /lb, can't compare"},
  {item:"Tomatoes Vine 1lb",qty:1,unit:"lb",psfc:4.22,ftp:null,fdOrg:4.49,fdConv:3.99,pOrg:"org",fOrg:null,note:"FTP per-piece"},
  {item:"Lettuce Romaine",qty:1,unit:"head",psfc:2.29,ftp:3.49,fdOrg:3.49,fdConv:null,pOrg:"org",fOrg:"org",note:""},
  {item:"Cucumber",qty:1,unit:"ea",psfc:3.98,ftp:3.99,fdOrg:3.49,fdConv:2.99,pOrg:"org",fOrg:"org",note:"European/English"},
  {item:"Bell Pepper Red",qty:1,unit:"lb",psfc:6.00,ftp:null,fdOrg:5.99,fdConv:3.99,pOrg:"org",fOrg:null,note:"FTP per-piece"},
  {item:"Sweet Potatoes 1lb",qty:1,unit:"lb",psfc:2.07,ftp:null,fdOrg:2.99,fdConv:1.99,pOrg:"org",fOrg:null,note:"FTP per-piece"},
  {item:"Cilantro bunch",qty:1,unit:"bunch",psfc:1.55,ftp:2.49,fdOrg:2.99,fdConv:1.99,pOrg:"org",fOrg:"org",note:""},
  {item:"Lemons 3ct",qty:1,unit:"3ct",psfc:null,ftp:2.99,fdOrg:null,fdConv:2.67,pOrg:null,fOrg:"org",note:"FD $0.89/ea×3"},
  {item:"Strawberries 1lb",qty:1,unit:"1lb",psfc:5.93,ftp:7.99,fdOrg:7.99,fdConv:4.99,pOrg:"org",fOrg:"org",note:""},
  {item:"Apples 2lb",qty:1,unit:"2lb",psfc:4.80,ftp:null,fdOrg:7.98,fdConv:3.98,pOrg:"ipm",fOrg:null,note:"PSFC $2.40/lb HC; FD $3.99 org HC"},
  {item:"Kale bunch",qty:1,unit:"bunch",psfc:1.78,ftp:2.97,fdOrg:2.99,fdConv:null,pOrg:"org",fOrg:"org",note:"Green kale"},
  {item:"Celery",qty:1,unit:"head",psfc:null,ftp:3.99,fdOrg:5.99,fdConv:4.99,pOrg:null,fOrg:"org",note:"PSFC /lb, can't compare"},
  {item:"Grape Tomatoes",qty:1,unit:"pint",psfc:3.23,ftp:5.99,fdOrg:4.99,fdConv:3.49,pOrg:"org",fOrg:"org",note:""},
];

function BasketCost() {
  const mono = "'JetBrains Mono',monospace";
  const totals = {psfc:0,ftp:0,fdOrg:0,fdConv:0,psfcN:0,ftpN:0,fdOrgN:0,fdConvN:0};
  BASKET.forEach(b => {
    if(b.psfc){totals.psfc+=b.psfc*b.qty;totals.psfcN++;}
    if(b.ftp){totals.ftp+=b.ftp*b.qty;totals.ftpN++;}
    if(b.fdOrg){totals.fdOrg+=b.fdOrg*b.qty;totals.fdOrgN++;}
    if(b.fdConv){totals.fdConv+=b.fdConv*b.qty;totals.fdConvN++;}
  });
  // Calculate totals only for items all 4 have (intersection)
  let intTotal = {psfc:0,ftp:0,fdOrg:0,fdConv:0,n:0};
  BASKET.forEach(b => {
    if(b.psfc&&b.ftp&&b.fdOrg&&b.fdConv){intTotal.psfc+=b.psfc*b.qty;intTotal.ftp+=b.ftp*b.qty;intTotal.fdOrg+=b.fdOrg*b.qty;intTotal.fdConv+=b.fdConv*b.qty;intTotal.n++;}
  });
  const fmt=v=>v!=null?'$'+v.toFixed(2):'—';
  const pct=(a,b)=>a&&b?Math.round(((b-a)/a)*100):null;
  return (
    <div style={{ padding:"16px 24px" }}>
      <h2 style={{ fontSize:16, fontWeight:700, color:"#fafafa", margin:"0 0 4px" }}>Weekly Produce Basket Cost</h2>
      <p style={{ fontSize:11, color:"#52525b", margin:"0 0 16px" }}>20 common items · prices as of March 27, 2026 · PSFC as baseline</p>
      
      {/* ANCHOR CARD: PSFC baseline + 3 columns showing premium/discount */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(150px, 1fr))", gap:10, marginBottom:20 }}>
        {/* PSFC anchor */}
        <div style={{ background:"#111114", borderRadius:10, padding:14, border:`2px solid ${RC.PSFC}44`, textAlign:"center" }}>
          <div style={{ fontSize:10, color:RC.PSFC, fontWeight:700, textTransform:"uppercase", letterSpacing:1 }}>PSFC (Baseline)</div>
          <div style={{ fontSize:9, color:"#3f3f46", marginBottom:6 }}>Co-op · mostly organic</div>
          <div style={{ fontSize:28, fontWeight:700, fontFamily:mono, color:RC.PSFC }}>{fmt(totals.psfc)}</div>
          <div style={{ fontSize:9, color:"#52525b" }}>{totals.psfcN} of {BASKET.length} items</div>
        </div>
        {/* FTP, FD Org, FD Conv — each showing premium/discount vs PSFC */}
        {[
          {name:"Farm to People",total:totals.ftp,n:totals.ftpN,color:RC.FTP,sub:"Delivery · organic"},
          {name:"FD Organic",total:totals.fdOrg,n:totals.fdOrgN,color:"#22c55e",sub:"Delivery · organic"},
          {name:"FD Conventional",total:totals.fdConv,n:totals.fdConvN,color:RC.FD,sub:"Delivery · conventional"},
        ].map((r,i) => {
          const diff = r.total - totals.psfc;
          const pctDiff = pct(totals.psfc, r.total);
          const isDiscount = diff < 0;
          return (
            <div key={i} style={{ background:"#111114", borderRadius:10, padding:14, border:`1px solid ${r.color}33`, textAlign:"center" }}>
              <div style={{ fontSize:10, color:r.color, fontWeight:700, textTransform:"uppercase", letterSpacing:1 }}>{r.name}</div>
              <div style={{ fontSize:9, color:"#3f3f46", marginBottom:6 }}>{r.sub}</div>
              <div style={{ fontSize:28, fontWeight:700, fontFamily:mono, color:"#fafafa" }}>{fmt(r.total)}</div>
              <div style={{ fontSize:11, fontWeight:700, fontFamily:mono, color:isDiscount?"#22c55e":"#ef4444", marginTop:4 }}>
                {isDiscount?"":"+"}{fmt(diff)} ({isDiscount?"":"+"}{ pctDiff}%)
              </div>
              <div style={{ fontSize:9, color:"#52525b" }}>{r.n} items · {isDiscount?"saves":"costs more"} vs PSFC</div>
            </div>
          );
        })}
      </div>

      {/* APPLES TO APPLES — only items priced at all 4 */}
      {intTotal.n > 0 && <div style={{ background:"#111114", borderRadius:10, padding:14, border:"1px solid #27272a", marginBottom:20 }}>
        <div style={{ fontSize:10, color:"#a78bfa", fontWeight:700, textTransform:"uppercase", letterSpacing:1, marginBottom:8 }}>Apples-to-Apples ({intTotal.n} items priced at all 4)</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(130px, 1fr))", gap:10 }}>
          {[
            {name:"PSFC",total:intTotal.psfc,color:RC.PSFC},
            {name:"FTP",total:intTotal.ftp,color:RC.FTP},
            {name:"FD Organic",total:intTotal.fdOrg,color:"#22c55e"},
            {name:"FD Conv.",total:intTotal.fdConv,color:RC.FD},
          ].map((r,i) => {
            const diff = r.total - intTotal.psfc;
            const isBase = i === 0;
            const isDiscount = diff < 0;
            return (
              <div key={i} style={{ textAlign:"center", padding:8, borderRadius:8, background:isBase?r.color+"15":"transparent", border:isBase?`1px solid ${r.color}44`:"1px solid transparent" }}>
                <div style={{ fontSize:9, color:r.color, fontWeight:600 }}>{r.name}</div>
                <div style={{ fontSize:22, fontWeight:700, fontFamily:mono, color:isBase?r.color:"#a1a1aa" }}>{fmt(r.total)}</div>
                {isBase && <div style={{ fontSize:9, color:RC.PSFC, fontWeight:600 }}>BASELINE</div>}
                {!isBase && <div style={{ fontSize:9, color:isDiscount?"#22c55e":"#ef4444", fontWeight:600 }}>
                  {isDiscount?"":"+"}${Math.abs(diff).toFixed(2)} ({pct(intTotal.psfc,r.total)}%)
                </div>}
              </div>
            );
          })}
        </div>
      </div>}

      {/* ITEM BREAKDOWN TABLE */}
      <div style={{ overflowX:"auto" }}>
      <table style={{ width:"100%", borderCollapse:"collapse", fontSize:11, minWidth:600 }}>
        <thead><tr>
          {["Item","Qty","PSFC","FTP","","FD Organic","","FD Conv.",""].map((h,i) => (
            <th key={i} style={{ textAlign:i<2?"left":"center", padding:"8px 6px", color:i===4||i===6||i===8?"#52525b":"#71717a", fontWeight:600, fontSize:9, textTransform:"uppercase", letterSpacing:0.8, borderBottom:"1px solid #1c1c22", fontFamily:mono }}>{i===4||i===6||i===8?"vs PSFC":h}</th>
          ))}
        </tr></thead>
        <tbody>
          {BASKET.map((b,i) => {
            const anchor = b.psfc;
            return (
              <tr key={i} style={{ background:i%2===0?"#0c0c0f":"#09090b" }}>
                <td style={{ padding:"6px", fontWeight:500, color:"#fafafa" }}>{b.item}</td>
                <td style={{ padding:"6px", color:"#71717a", fontSize:10 }}>{b.qty} {b.unit}</td>
                {/* PSFC - anchor */}
                <td style={{ padding:"6px", textAlign:"center", fontFamily:mono, fontSize:12, fontWeight:700, color:RC.PSFC, background:RC.PSFC+"08" }}>
                  {anchor != null ? '$'+(anchor*b.qty).toFixed(2) : '—'}
                </td>
                {/* FTP + delta */}
                {(() => {
                  const v = b.ftp; const cost = v != null ? v*b.qty : null; const aCost = anchor != null ? anchor*b.qty : null;
                  const d = cost!=null&&aCost!=null ? cost-aCost : null;
                  return <>
                    <td style={{ padding:"6px", textAlign:"center", fontFamily:mono, fontSize:12, fontWeight:700, color:v!=null?"#a1a1aa":"#27272a" }}>{cost!=null?'$'+cost.toFixed(2):'—'}</td>
                    <td style={{ padding:"6px", textAlign:"center", fontFamily:mono, fontSize:10, fontWeight:600, color:d!=null?(d<0?"#22c55e":"#ef4444"):"#27272a" }}>{d!=null?(d<0?'':'+')+'$'+d.toFixed(2):'—'}</td>
                  </>;
                })()}
                {/* FD Organic + delta */}
                {(() => {
                  const v = b.fdOrg; const cost = v != null ? v*b.qty : null; const aCost = anchor != null ? anchor*b.qty : null;
                  const d = cost!=null&&aCost!=null ? cost-aCost : null;
                  return <>
                    <td style={{ padding:"6px", textAlign:"center", fontFamily:mono, fontSize:12, fontWeight:700, color:v!=null?"#a1a1aa":"#27272a" }}>{cost!=null?'$'+cost.toFixed(2):'—'}</td>
                    <td style={{ padding:"6px", textAlign:"center", fontFamily:mono, fontSize:10, fontWeight:600, color:d!=null?(d<0?"#22c55e":"#ef4444"):"#27272a" }}>{d!=null?(d<0?'':'+')+'$'+d.toFixed(2):'—'}</td>
                  </>;
                })()}
                {/* FD Conv + delta */}
                {(() => {
                  const v = b.fdConv; const cost = v != null ? v*b.qty : null; const aCost = anchor != null ? anchor*b.qty : null;
                  const d = cost!=null&&aCost!=null ? cost-aCost : null;
                  return <>
                    <td style={{ padding:"6px", textAlign:"center", fontFamily:mono, fontSize:12, fontWeight:700, color:v!=null?"#a1a1aa":"#27272a" }}>{cost!=null?'$'+cost.toFixed(2):'—'}</td>
                    <td style={{ padding:"6px", textAlign:"center", fontFamily:mono, fontSize:10, fontWeight:600, color:d!=null?(d<0?"#22c55e":"#ef4444"):"#27272a" }}>{d!=null?(d<0?'':'+')+'$'+d.toFixed(2):'—'}</td>
                  </>;
                })()}
              </tr>
            );
          })}
          <tr style={{ borderTop:"2px solid #27272a", background:"#111114" }}>
            <td style={{ padding:"8px 6px", fontWeight:700, color:"#fafafa" }}>TOTAL</td>
            <td></td>
            <td style={{ padding:"8px 6px", textAlign:"center", fontFamily:mono, fontSize:14, fontWeight:700, color:RC.PSFC }}>{fmt(totals.psfc)}</td>
            <td style={{ padding:"8px 6px", textAlign:"center", fontFamily:mono, fontSize:14, fontWeight:700, color:RC.FTP }}>{fmt(totals.ftp)}</td>
            <td style={{ padding:"8px 6px", textAlign:"center", fontFamily:mono, fontSize:10, fontWeight:700, color:"#ef4444" }}>+{fmt(totals.ftp-totals.psfc)}</td>
            <td style={{ padding:"8px 6px", textAlign:"center", fontFamily:mono, fontSize:14, fontWeight:700, color:"#22c55e" }}>{fmt(totals.fdOrg)}</td>
            <td style={{ padding:"8px 6px", textAlign:"center", fontFamily:mono, fontSize:10, fontWeight:700, color:"#ef4444" }}>+{fmt(totals.fdOrg-totals.psfc)}</td>
            <td style={{ padding:"8px 6px", textAlign:"center", fontFamily:mono, fontSize:14, fontWeight:700, color:RC.FD }}>{fmt(totals.fdConv)}</td>
            <td style={{ padding:"8px 6px", textAlign:"center", fontFamily:mono, fontSize:10, fontWeight:700, color:totals.fdConv<totals.psfc?"#22c55e":"#ef4444" }}>{totals.fdConv<totals.psfc?'':'+'}${(totals.fdConv-totals.psfc).toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
      </div>
      <div style={{ marginTop:12, fontSize:9, color:"#3f3f46", lineHeight:1.6 }}>
        Note: Totals include different item counts per retailer due to availability. The "Apples-to-Apples" section above compares only items priced at all 4.
        FD Conventional may show as a discount vs PSFC Organic — this reflects the organic premium, not just retailer markup.
      </div>
    </div>
  );
}

function ExecSummary({ stats }) {
  const mono = "'JetBrains Mono',monospace";
  const fmt = v => '$'+v.toFixed(2);

  // Calculate outliers and insights from DATA
  const comparable = DATA.filter(d => d.unitMatch !== "diff" && getP(d,"psfc") && getP(d,"ftp"));
  const withPrem = comparable.map(d => ({...d, prem: Math.round(((getP(d,"ftp")-getP(d,"psfc"))/getP(d,"psfc"))*100)})).sort((a,b) => b.prem - a.prem);
  const top5 = withPrem.slice(0,5);
  const bot5 = withPrem.slice(-5).reverse();

  // FD vs PSFC where both organic
  const fdOrgComp = DATA.filter(d => d.unitMatch !== "diff" && d.psfc && d.fd && d.psfcOrg === "org" && d.fdOrg === "org");
  const fdOrgAvg = fdOrgComp.length ? fdOrgComp.reduce((s,d) => s + ((getP(d,"fd")-getP(d,"psfc"))/getP(d,"psfc"))*100, 0) / fdOrgComp.length : 0;

  // Category breakdown
  const cats = {};
  comparable.forEach(d => {
    if (!cats[d.cat]) cats[d.cat] = {sum:0,n:0};
    cats[d.cat].sum += ((getP(d,"ftp")-getP(d,"psfc"))/getP(d,"psfc"))*100;
    cats[d.cat].n++;
  });
  const catAvgs = Object.entries(cats).map(([c,v]) => ({cat:c, avg:Math.round(v.sum/v.n), n:v.n})).sort((a,b) => b.avg - a.avg);

  return (
    <div style={{ padding:"16px 24px" }}>
      <h2 style={{ fontSize:16, fontWeight:700, color:"#fafafa", margin:"0 0 16px" }}>Executive Summary</h2>
      
      {/* KEY METRICS */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(180px, 1fr))", gap:10, marginBottom:20 }}>
        <div style={{ background:"#111114", borderRadius:10, padding:14, border:"1px solid #3b82f633" }}>
          <div style={{ fontSize:10, color:"#52525b", textTransform:"uppercase", letterSpacing:1, fontFamily:mono }}>PSFC is Cheapest</div>
          <div style={{ fontSize:32, fontWeight:700, color:RC.PSFC }}>{stats.pW}<span style={{ fontSize:14, color:"#52525b" }}>/{stats.comp}</span></div>
          <div style={{ fontSize:10, color:"#71717a" }}>{Math.round(stats.pW/stats.comp*100)}% of comparable items</div>
        </div>
        <div style={{ background:"#111114", borderRadius:10, padding:14, border:"1px solid #a78bfa33" }}>
          <div style={{ fontSize:10, color:"#52525b", textTransform:"uppercase", letterSpacing:1, fontFamily:mono }}>FTP Premium ($ weighted)</div>
          <div style={{ fontSize:32, fontWeight:700, color:"#a78bfa" }}>{stats.weightedPrem}%</div>
          <div style={{ fontSize:10, color:"#71717a" }}>Weighted by actual dollar cost</div>
          <div style={{ fontSize:9, color:"#3f3f46", marginTop:2 }}>Straight avg: {stats.avgPrem}% (skewed by outliers)</div>
        </div>
        <div style={{ background:"#111114", borderRadius:10, padding:14, border:"1px solid #22c55e33" }}>
          <div style={{ fontSize:10, color:"#52525b", textTransform:"uppercase", letterSpacing:1, fontFamily:mono }}>FD Organic Premium ($ weighted)</div>
          <div style={{ fontSize:32, fontWeight:700, color:"#22c55e" }}>{stats.fdOrgWeighted}%</div>
          <div style={{ fontSize:10, color:"#71717a" }}>{stats.fdOrgComp} organic-to-organic items</div>
        </div>
      </div>

      {/* METHODOLOGY NOTE */}
      <div style={{ background:"#0c0c0f", borderRadius:8, padding:10, border:"1px solid #27272a", marginBottom:16, fontSize:10, color:"#71717a", lineHeight:1.6 }}>
        <strong style={{ color:"#a78bfa" }}>Why dollar-weighted?</strong> A straight average treats a 489% markup on $2.37 ginger the same as a 49% markup on $2.01 potatoes. Dollar-weighting asks: "if I bought one unit of everything, how much more would my total bill be?" This better reflects real-world shopping impact.
      </div>

      {/* TOP OUTLIERS */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(250px, 1fr))", gap:16, marginBottom:20 }}>
        <div style={{ background:"#111114", borderRadius:10, padding:14, border:"1px solid #ef444433" }}>
          <div style={{ fontSize:11, fontWeight:700, color:"#ef4444", marginBottom:10 }}>🔴 Biggest FTP Premiums over PSFC</div>
          {top5.map((d,i) => (
            <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"4px 0", borderBottom:"1px solid #1c1c22" }}>
              <span style={{ fontSize:11, color:"#e4e4e7" }}>{d.product}</span>
              <span style={{ fontFamily:mono, fontSize:11, fontWeight:700, color:"#ef4444" }}>+{d.prem}%</span>
            </div>
          ))}
        </div>
        <div style={{ background:"#111114", borderRadius:10, padding:14, border:"1px solid #22c55e33" }}>
          <div style={{ fontSize:11, fontWeight:700, color:"#22c55e", marginBottom:10 }}>🟢 FTP Wins (cheaper than PSFC)</div>
          {bot5.map((d,i) => (
            <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"4px 0", borderBottom:"1px solid #1c1c22" }}>
              <span style={{ fontSize:11, color:"#e4e4e7" }}>{d.product}</span>
              <span style={{ fontFamily:mono, fontSize:11, fontWeight:700, color:d.prem<0?"#22c55e":"#facc15" }}>{d.prem>0?"+":""}{d.prem}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* CATEGORY BREAKDOWN */}
      <div style={{ background:"#111114", borderRadius:10, padding:14, border:"1px solid #27272a", marginBottom:20 }}>
        <div style={{ fontSize:11, fontWeight:700, color:"#a78bfa", marginBottom:10 }}>FTP Premium by Category (avg % over PSFC)</div>
        {catAvgs.map((c,i) => {
          const maxPrem = Math.max(...catAvgs.map(x=>Math.abs(x.avg)));
          const width = Math.abs(c.avg)/maxPrem*100;
          return (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
              <span style={{ fontSize:10, color:"#a1a1aa", width:120, flexShrink:0 }}>{c.cat} ({c.n})</span>
              <div style={{ flex:1, height:16, background:"#1c1c22", borderRadius:4, overflow:"hidden", position:"relative" }}>
                <div style={{ width:width+"%", height:"100%", background:c.avg>0?"#ef4444":"#22c55e", borderRadius:4, opacity:0.7 }} />
                <span style={{ position:"absolute", right:4, top:1, fontSize:9, fontFamily:mono, fontWeight:700, color:"#fafafa" }}>{c.avg>0?"+":""}{c.avg}%</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* KEY INSIGHTS */}
      <div style={{ background:"#111114", borderRadius:10, padding:14, border:"1px solid #27272a" }}>
        <div style={{ fontSize:11, fontWeight:700, color:"#fafafa", marginBottom:10 }}>Key Insights</div>
        {[
          "PSFC's co-op model (member labor, 21% markup) consistently beats both delivery services on price.",
          "FreshDirect Organic prices sit between PSFC and FTP — they're the middle option for organic shoppers who want delivery.",
          "FreshDirect Conventional is often cheaper than PSFC Organic — the organic premium is real and measurable.",
          "FTP's biggest markups are on staples (potatoes +172%, beets +121%) where PSFC's bulk/loose pricing shines.",
          "FTP wins on specialty mushrooms (maitake, king trumpet) where Tivoli's flat $8.99/8oz pricing beats PSFC's per-lb.",
          "Gotham Greens salad kits are ~30% more at FTP than PSFC — exact same product, pure retailer markup.",
          "Lancaster Farm Fresh products appear at all 3 retailers at different prices — a great benchmark for pure markup comparison.",
        ].map((insight,i) => (
          <div key={i} style={{ fontSize:11, color:"#a1a1aa", padding:"6px 0", borderBottom:i<6?"1px solid #1c1c22":"none", lineHeight:1.5 }}>
            <span style={{ color:"#52525b", marginRight:6 }}>→</span>{insight}
          </div>
        ))}
      </div>
    </div>
  );
}

function ProcessMap() {
  return (
    <div style={{ background: "#FAFAF9", height: "calc(100vh - 64px)", overflow: "hidden" }}>
      <iframe
        src="/process-map.html"
        title="Jar of Jam Process Map"
        style={{ width: "100%", height: "100%", border: "none", display: "block" }}
      />
    </div>
  );
}

function Home({ goto }) {
  const mono = "'JetBrains Mono',monospace";
  const ACCENT = "#4F46E5";

  const cards = [
    {
      eyebrow: "Primary diagnostic artifact",
      title: "Jar of Jam — Lifecycle Map",
      desc: "End-to-end path of a single SKU from purchase order to delivered box. Of twenty steps across five lanes, exactly one is captured by the system of record. The map makes visible where physical reality and the ERP's model of it drift apart — which is the upstream source of most of what surfaces as inventory accuracy downstream.",
      stats: [
        { k: "steps", v: "20" },
        { k: "lanes", v: "5" },
        { k: "in-system", v: "1" },
      ],
      cta: "Open process map",
      section: "processmap",
      accent: "#4F46E5",
      primary: true,
    },
    {
      eyebrow: "Companion analysis",
      title: "Produce Pricing Comparison",
      desc: "Side-by-side prices across Park Slope Food Coop, Farm to People, and FreshDirect. 360+ items normalized for unit and organic status to expose dollar and percentage gaps — and to quantify the FTP premium as a dollar-weighted average against what a Brooklyn customer can buy elsewhere.",
      stats: [
        { k: "items", v: `${DATA.length}` },
        { k: "retailers", v: "3" },
        { k: "categories", v: `${new Set(DATA.map(d => d.cat)).size}` },
      ],
      cta: "Open pricing analysis",
      section: "pricing",
      accent: "#a78bfa",
    },
  ];

  return (
    <div style={{ background: "#09090b", color: "#e4e4e7", minHeight: "calc(100vh - 64px)" }}>
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "96px 32px 56px" }}>
        <div style={{ fontSize: 11, color: ACCENT, fontFamily: mono, letterSpacing: 2.5, textTransform: "uppercase", marginBottom: 24, fontWeight: 600 }}>
          Farm to People · Warehouse Operations Diagnostic
        </div>
        <h1 style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 700, lineHeight: 1.05, margin: 0, color: "#fafafa", maxWidth: 880, letterSpacing: -1.5 }}>
          Making the operating layer underneath the consumer business legible — before the mid-July split.
        </h1>
        <p style={{ fontSize: 17, color: "#a1a1aa", lineHeight: 1.55, marginTop: 28, maxWidth: 760 }}>
          Ten days on the floor surfaced an architectural pattern: the warehouse runs better than its instrumentation would predict because the team has built an informal layer that papers over the places the system of record does not extend. That layer holds at one site. It does not survive a second one ten minutes away.
        </p>
        <p style={{ fontSize: 15, color: "#71717a", lineHeight: 1.6, marginTop: 14, maxWidth: 760 }}>
          The process map is the artifact the diagnostic is built on. The pricing analysis is a companion piece on the consumer side of the same business.
        </p>
        <div style={{ display: "flex", gap: 10, marginTop: 36, flexWrap: "wrap" }}>
          <button onClick={() => goto("processmap")} style={{
            background: "#fafafa", color: "#09090b", border: "none", padding: "12px 20px",
            borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
          }}>Open process map →</button>
          <button onClick={() => goto("pricing")} style={{
            background: "transparent", color: "#e4e4e7", border: "1px solid #3f3f46", padding: "12px 20px",
            borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
          }}>View pricing analysis →</button>
        </div>
      </section>

      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 32px 64px" }}>
        <div style={{ fontSize: 10, color: "#52525b", fontFamily: mono, letterSpacing: 2, textTransform: "uppercase", marginBottom: 18, fontWeight: 600 }}>
          Work to date
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))", gap: 16 }}>
          {cards.map((c, i) => (
            <div key={i} onClick={() => goto(c.section)} role="button" tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter") goto(c.section); }}
              style={{
                background: "#111114",
                border: `1px solid ${c.primary ? c.accent + "55" : "#1f1f23"}`,
                borderRadius: 14,
                padding: 28, cursor: "pointer", transition: "all 0.2s ease",
                display: "flex", flexDirection: "column", position: "relative", overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = c.accent + "99";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = c.primary ? c.accent + "55" : "#1f1f23";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: c.primary ? 4 : 3, background: c.accent, opacity: c.primary ? 0.9 : 0.6 }} />
              <div style={{ fontSize: 10, color: c.accent, fontFamily: mono, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12, fontWeight: 600 }}>
                {c.eyebrow}
              </div>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: "#fafafa", margin: 0, letterSpacing: -0.5 }}>
                {c.title}
              </h2>
              <p style={{ fontSize: 13.5, color: "#a1a1aa", lineHeight: 1.6, marginTop: 12, marginBottom: 20, flex: 1 }}>
                {c.desc}
              </p>
              <div style={{ display: "flex", gap: 24, paddingBottom: 18, marginBottom: 18, borderBottom: "1px solid #1f1f23" }}>
                {c.stats.map((s, j) => (
                  <div key={j}>
                    <div style={{ fontSize: 22, fontWeight: 700, color: "#fafafa", fontFamily: mono, lineHeight: 1 }}>{s.v}</div>
                    <div style={{ fontSize: 10, color: "#52525b", fontFamily: mono, textTransform: "uppercase", letterSpacing: 1, marginTop: 4 }}>{s.k}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: c.accent }}>{c.cta}</span>
                <span style={{ fontSize: 16, color: c.accent }}>→</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ borderTop: "1px solid #1c1c22", background: "#0a0a0d" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 32px 64px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 32 }}>
          <div>
            <div style={{ fontSize: 10, color: "#52525b", fontFamily: mono, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12, fontWeight: 600 }}>
              Frame
            </div>
            <p style={{ fontSize: 13, color: "#a1a1aa", lineHeight: 1.7, margin: 0 }}>
              The inventory accuracy issue is real, the staffing and space constraints are real, and they are symptoms of something one layer deeper: an operating layer that lives almost entirely outside the system of record.
            </p>
          </div>
          <div>
            <div style={{ fontSize: 10, color: "#52525b", fontFamily: mono, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12, fontWeight: 600 }}>
              Forcing function
            </div>
            <p style={{ fontSize: 13, color: "#a1a1aa", lineHeight: 1.7, margin: 0 }}>
              The mid-July launch of warehouse 2 is a structural change to the operating environment, not just a capacity decision. The informal layer that papers over the gaps today is the thing that breaks first when inventory splits across two sites.
            </p>
          </div>
          <div>
            <div style={{ fontSize: 10, color: "#52525b", fontFamily: mono, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12, fontWeight: 600 }}>
              Shape of the work
            </div>
            <p style={{ fontSize: 13, color: "#a1a1aa", lineHeight: 1.7, margin: 0 }}>
              Not a full operating system — that is a multi-year build. The minimum viable kernel that lets two sites stand up in mid-July, designed so every piece is foundation for what comes next rather than something to be thrown away.
            </p>
          </div>
        </div>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px 56px", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, fontFamily: mono, fontSize: 11, color: "#52525b" }}>
          <div>Prepared by Jordan Benkov · For Farm to People leadership</div>
          <div>Engagement window: June 8 – July 10, 2026</div>
        </div>
      </section>
    </div>
  );
}

export default function App() {
  const [section, setSection] = useState("processmap");
  const [tab, setTab] = useState("summary");
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("All");
  const [unitFilter, setUnitFilter] = useState("all");
  const [orgFilter, setOrgFilter] = useState("all");
  const [sortBy, setSortBy] = useState("category");
  const [expandedRow, setExpandedRow] = useState(null);
  const [winnerFilter, setWinnerFilter] = useState("all");

  const filtered = useMemo(() => {
    let items = DATA;
    if (selectedCat !== "All") items = items.filter(d => d.cat === selectedCat);
    if (search) items = items.filter(d => d.product.toLowerCase().includes(search.toLowerCase()) || d.cat.toLowerCase().includes(search.toLowerCase()));
    if (unitFilter === "comparable") items = items.filter(d => d.unitMatch !== "diff");
    else if (unitFilter !== "all") items = items.filter(d => d.unitMatch === unitFilter);
    if (orgFilter === "all_org") items = items.filter(d => { const o = [d.psfcOrg,d.ftpOrg,d.fdOrg].filter(Boolean); return o.length > 0 && o.every(x => x==="org"||x==="og"); });
    else if (orgFilter === "mixed") items = items.filter(d => { const o = [d.psfcOrg,d.ftpOrg,d.fdOrg].filter(Boolean); return o.length > 1 && new Set(o).size > 1; });
    if (winnerFilter !== "all") items = items.filter(d => getWinner(d) === winnerFilter);
    if (sortBy === "psfc") items = [...items].sort((a,b) => (getP(a,"psfc")??999) - (getP(b,"psfc")??999));
    else if (sortBy === "ftp") items = [...items].sort((a,b) => (getP(a,"ftp")??999) - (getP(b,"ftp")??999));
    else if (sortBy === "fd") items = [...items].sort((a,b) => (getP(a,"fd")??999) - (getP(b,"fd")??999));
    else if (sortBy === "gap_desc" || sortBy === "gap_asc") {
      items = [...items].sort((a,b) => {
        const ap=getP(a,"psfc"),af=getP(a,"ftp"),bp=getP(b,"psfc"),bf=getP(b,"ftp");
        const ag = ap&&af ? (af-ap)/ap : (sortBy === "gap_desc" ? -Infinity : Infinity);
        const bg = bp&&bf ? (bf-bp)/bp : (sortBy === "gap_desc" ? -Infinity : Infinity);
        return sortBy === "gap_desc" ? bg - ag : ag - bg;
      });
    }
    return items;
  }, [search, selectedCat, unitFilter, orgFilter, sortBy, winnerFilter]);

  const stats = useMemo(() => {
    const comp = DATA.filter(d => d.unitMatch !== "diff" && getP(d,"psfc") && getP(d,"ftp"));
    let pW=0,fW=0,dW=0;
    comp.forEach(r => { const w=getWinner(r); if(w==="PSFC")pW++; else if(w==="FTP")fW++; else if(w==="FD")dW++; });
    const avgPrem = comp.length ? comp.reduce((s,d) => s+((getP(d,"ftp")-getP(d,"psfc"))/getP(d,"psfc"))*100, 0)/comp.length : 0;
    // Dollar-weighted: sum(ftp-psfc) / sum(psfc) — how much more you'd actually spend
    const totalPsfc = comp.reduce((s,d) => s+getP(d,"psfc"), 0);
    const totalFtp = comp.reduce((s,d) => s+getP(d,"ftp"), 0);
    const weightedPrem = totalPsfc > 0 ? ((totalFtp - totalPsfc) / totalPsfc) * 100 : 0;
    // FD organic weighted
    const fdOrgComp = DATA.filter(d => d.unitMatch !== "diff" && getP(d,"psfc") && getP(d,"fd") && d.psfcOrg === "org" && d.fdOrg === "org");
    const fdOrgPsfcTotal = fdOrgComp.reduce((s,d) => s+getP(d,"psfc"), 0);
    const fdOrgFdTotal = fdOrgComp.reduce((s,d) => s+getP(d,"fd"), 0);
    const fdOrgWeighted = fdOrgPsfcTotal > 0 ? ((fdOrgFdTotal - fdOrgPsfcTotal) / fdOrgPsfcTotal) * 100 : 0;
    return { exact:DATA.filter(d=>d.unitMatch==="exact").length, close:DATA.filter(d=>d.unitMatch==="close").length, diff:DATA.filter(d=>d.unitMatch==="diff").length, comp:comp.length, pW, fW, dW, avgPrem:avgPrem.toFixed(0), weightedPrem:weightedPrem.toFixed(0), fdOrgWeighted:fdOrgWeighted.toFixed(0), fdOrgComp:fdOrgComp.length, total:DATA.length };
  }, []);

  const s = { fontFamily:"'DM Sans','Helvetica Neue',sans-serif" };

  const sections = [
    { id: "processmap", label: "Process Map" },
    { id: "pricing",    label: "Pricing Analysis" },
    { id: "home",       label: "Overview" },
  ];

  return (
    <div style={{ ...s, background:"#09090b", color:"#e4e4e7", minHeight:"100vh", overflowX:"hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
      <nav style={{
        position:"sticky", top:0, zIndex:50,
        background:"rgba(9,9,11,0.85)", backdropFilter:"blur(10px)", WebkitBackdropFilter:"blur(10px)",
        borderBottom:"1px solid #1c1c22",
        padding:"14px 24px",
        display:"flex", alignItems:"center", justifyContent:"space-between", gap:16, flexWrap:"wrap",
      }}>
        <div onClick={()=>setSection("processmap")} style={{ cursor:"pointer", display:"flex", alignItems:"baseline", gap:8 }}>
          <span style={{ fontSize:15, fontWeight:700, color:"#fafafa", letterSpacing:-0.3 }}>Farm to People</span>
          <span style={{ fontSize:11, color:"#52525b", fontFamily:"'JetBrains Mono',monospace", letterSpacing:0.5 }}>· workspace</span>
        </div>
        <div style={{ display:"flex", gap:2 }}>
          {sections.map(sec => (
            <button key={sec.id} onClick={()=>setSection(sec.id)} style={{
              background: section===sec.id ? "#1c1c22" : "transparent",
              border:"1px solid " + (section===sec.id ? "#27272a" : "transparent"),
              color: section===sec.id ? "#fafafa" : "#a1a1aa",
              padding:"7px 14px", borderRadius:7, fontSize:13, fontWeight:500, cursor:"pointer",
              fontFamily:"inherit", transition:"all 0.15s",
            }}>{sec.label}</button>
          ))}
        </div>
      </nav>

      {section === "home" && <Home goto={setSection} />}
      {section === "processmap" && <ProcessMap />}
      {section === "pricing" && <>
      <div style={{ padding:"20px 24px 16px", borderBottom:"1px solid #1c1c22" }}>
        <h1 style={{ fontSize:20, fontWeight:700, margin:0, color:"#fafafa", letterSpacing:"-0.5px" }}>Brooklyn Produce Price Comparison</h1>
        <p style={{ fontSize:11, color:"#52525b", margin:"4px 0 0", fontFamily:"'JetBrains Mono',monospace" }}>PSFC · Farm to People · FreshDirect — March 27, 2026</p>
        <div style={{ display:"flex", gap:4, marginTop:12, flexWrap:"wrap" }}>
          {[
            {id:"summary",label:"Summary",color:"#a78bfa"},
            {id:"basket",label:"Basket Cost",color:"#ec4899"},
            {id:"compare",label:"Comparison",count:DATA.length},
            {id:"psfc",label:"PSFC",count:PSFC.length,color:RC.PSFC},
            {id:"ftp",label:"FTP",count:FTP.length,color:RC.FTP},
            {id:"fd",label:"FreshDirect",count:FD.length,color:RC.FD},
          ].map(t => (
            <button key={t.id} onClick={()=>{setTab(t.id);setSearch("");setSelectedCat("All");}} style={{
              background:tab===t.id?"#1c1c22":"transparent", border:tab===t.id?`1px solid ${t.color||"#3f3f46"}`:"1px solid transparent",
              borderRadius:6, padding:"6px 12px", color:tab===t.id?(t.color||"#fafafa"):"#71717a", fontSize:11, fontWeight:600, cursor:"pointer",
              fontFamily:"'DM Sans',sans-serif", transition:"all 0.15s",
            }}>{t.label}{t.count != null && <span style={{ fontSize:9, opacity:0.6, marginLeft:2 }}>{t.count}</span>}</button>
          ))}
        </div>
      </div>
      {tab === "compare" && <>
        <div style={{ padding:"8px 24px 12px", background:"#09090b" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(100px, 1fr))", gap:8 }}>
          {[
            {l:"Exact",v:stats.exact,c:"#22c55e",s:"same units",click:()=>setUnitFilter(unitFilter==="exact"?"all":"exact"),active:unitFilter==="exact"},
            {l:"Normalized",v:stats.close,c:"#facc15",s:"converted",click:()=>setUnitFilter(unitFilter==="close"?"all":"close"),active:unitFilter==="close"},
            {l:"Incomparable",v:stats.diff,c:"#ef4444",s:"diff units",click:()=>setUnitFilter(unitFilter==="diff"?"all":"diff"),active:unitFilter==="diff"},
            {l:"PSFC Wins",v:stats.pW,c:RC.PSFC,s:`of ${stats.comp}`,click:()=>setWinnerFilter(winnerFilter==="PSFC"?"all":"PSFC"),active:winnerFilter==="PSFC"},
            {l:"FTP Wins",v:stats.fW,c:RC.FTP,s:"",click:()=>setWinnerFilter(winnerFilter==="FTP"?"all":"FTP"),active:winnerFilter==="FTP"},
            {l:"FD Wins",v:stats.dW,c:RC.FD,s:"",click:()=>setWinnerFilter(winnerFilter==="FD"?"all":"FD"),active:winnerFilter==="FD"},
            {l:"FTP Prem.",v:`${stats.weightedPrem}%`,c:"#a78bfa",s:"$ weighted avg",click:()=>{setSortBy(sortBy==="gap_desc"?"category":"gap_desc")},active:sortBy==="gap_desc"||sortBy==="gap_asc"},
          ].map((c,i) => (
            <div key={i} onClick={c.click} style={{ background:c.active?"#1c1c22":"#111114", borderRadius:8, padding:"8px 10px", border:`1px solid ${c.active?c.c:c.c+"22"}`, cursor:"pointer", transition:"all 0.15s", transform:c.active?"scale(1.02)":"scale(1)" }}>
              <div style={{ fontSize:8, color:c.active?c.c:"#52525b", textTransform:"uppercase", letterSpacing:1, fontFamily:"'JetBrains Mono',monospace" }}>{c.l}{c.active?" ✕":""}</div>
              <div style={{ fontSize:22, fontWeight:700, color:c.c, marginTop:1 }}>{c.v}</div>
              {c.s && <div style={{ fontSize:9, color:c.active?"#71717a":"#3f3f46" }}>{c.s}</div>}
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding:"10px 24px", borderBottom:"1px solid #1c1c22", display:"flex", gap:8, flexWrap:"wrap", alignItems:"center", background:"#0c0c0f" }}>
        <input type="text" placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)} style={{ background:"#111114", border:"1px solid #27272a", borderRadius:6, padding:"6px 10px", color:"#e4e4e7", fontSize:12, width:140, outline:"none", ...s }} />
        <select value={selectedCat} onChange={e=>setSelectedCat(e.target.value)} style={{ background:"#111114", border:"1px solid #27272a", borderRadius:6, padding:"6px 8px", color:"#e4e4e7", fontSize:12, ...s }}>
          <option value="All">All Categories</option>
          {CATS.map(c=><option key={c} value={c}>{c}</option>)}
        </select>
        <select value={unitFilter} onChange={e=>setUnitFilter(e.target.value)} style={{ background:"#111114", border:"1px solid #27272a", borderRadius:6, padding:"6px 8px", color:"#e4e4e7", fontSize:12, ...s }}>
          <option value="all">All Unit Types</option>
          <option value="comparable">✓ Comparable (exact + normalized)</option>
          <option value="exact">✓ Exact Only</option>
          <option value="close">≈ Normalized Only</option>
          <option value="diff">✗ Incomparable</option>
        </select>
        <select value={orgFilter} onChange={e=>setOrgFilter(e.target.value)} style={{ background:"#111114", border:"1px solid #27272a", borderRadius:6, padding:"6px 8px", color:"#e4e4e7", fontSize:12, ...s }}>
          <option value="all">All Organic Status</option>
          <option value="all_org">Same Organic Only</option>
          <option value="mixed">Mixed Org/Conv ⚠</option>
        </select>
        <select value={sortBy} onChange={e=>setSortBy(e.target.value)} style={{ background:"#111114", border:"1px solid #27272a", borderRadius:6, padding:"6px 8px", color:"#e4e4e7", fontSize:12, ...s }}>
          <option value="category">Sort: Category</option>
          <option value="psfc">Sort: PSFC ↑</option>
          <option value="ftp">Sort: FTP ↑</option>
          <option value="fd">Sort: FD ↑</option>
          <option value="gap_desc">Sort: FTP Premium ↓ (highest first)</option>
          <option value="gap_asc">Sort: FTP Premium ↑ (lowest/negative first)</option>
        </select>
        <span style={{ fontSize:11, color:"#3f3f46", marginLeft:"auto", fontFamily:"'JetBrains Mono',monospace" }}>{filtered.length} items</span>
      </div>
      <div style={{ overflowX:"auto", padding:"0 24px 24px" }}>
        <table style={{ width:"100%", borderCollapse:"collapse", marginTop:4, fontSize:11 }}>
          <thead><tr>
            {["","Product","PSFC","","FTP","","FTP vs PSFC","FD","","Units","Notes"].map((h,i) => (
              <th key={i} style={{ textAlign:i<2?"left":"center", padding:"8px 5px", color:h==="FTP vs PSFC"?"#a78bfa":"#52525b", fontWeight:600, fontSize:9, textTransform:"uppercase", letterSpacing:0.8, borderBottom:"1px solid #1c1c22", fontFamily:"'JetBrains Mono',monospace", position:"sticky", top:0, background:"#09090b", zIndex:1, whiteSpace:"nowrap" }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {filtered.map((row, idx) => {
              const winner = getWinner(row);
              const isExp = expandedRow === idx;
              const pC = getP(row,"psfc"), fC = getP(row,"ftp");
              const hasBoth = pC && fC;
              const isDiff = row.unitMatch === "diff";
              const pct = hasBoth ? Math.round(((fC-pC)/pC)*100) : null;
              const sameOrg = row.psfcOrg && row.ftpOrg && (row.psfcOrg===row.ftpOrg || (["org","og"].includes(row.psfcOrg)&&["org","og"].includes(row.ftpOrg)));
              const premColor = pct===null?"#27272a": isDiff?"#52525b": pct>80?"#ef4444":pct>40?"#f97316":pct>0?"#facc15":pct===0?"#71717a":"#22c55e";
              return [
                <tr key={idx} onClick={()=>setExpandedRow(isExp?null:idx)} style={{ cursor:"pointer", background:idx%2===0?"#0c0c0f":"#09090b", transition:"background 0.15s" }}
                  onMouseEnter={e=>e.currentTarget.style.background="#14141a"} onMouseLeave={e=>e.currentTarget.style.background=idx%2===0?"#0c0c0f":"#09090b"}>
                  <td style={{ padding:"6px 5px", color:"#3f3f46", fontSize:10, whiteSpace:"nowrap" }}>{row.cat}</td>
                  <td style={{ padding:"6px 5px", fontWeight:600, color:"#fafafa", whiteSpace:"nowrap" }}>{row.product}</td>
                  <PriceCell raw={row.psfc} norm={row.psfcNorm} unit={row.psfcUnit} isWinner={winner==="PSFC"} color={RC.PSFC} />
                  <td style={{ padding:"2px", textAlign:"center" }}><OrgBadge org={row.psfcOrg} /></td>
                  <PriceCell raw={row.ftp} norm={row.ftpNorm} unit={row.ftpUnit} isWinner={winner==="FTP"} color={RC.FTP} />
                  <td style={{ padding:"2px", textAlign:"center" }}><OrgBadge org={row.ftpOrg} /></td>
                  <td style={{ padding:"6px 4px", textAlign:"center", fontFamily:"'JetBrains Mono',monospace", fontSize:11, fontWeight:700, color:premColor, background:pct!==null&&!isDiff&&pct>80?"#ef444410":pct!==null&&!isDiff&&pct<0?"#22c55e10":"transparent", whiteSpace:"nowrap" }}>
                    {pct !== null ? <span style={isDiff?{opacity:0.5}:{}}>
                      {pct>0?"+":""}{pct}%
                      {isDiff&&<span title="Different units — raw price comparison only" style={{ fontSize:8, marginLeft:2, color:"#ef4444" }}>✗</span>}
                      {!isDiff&&!sameOrg&&hasBoth&&<span title="Different organic status" style={{ fontSize:8, marginLeft:2, color:"#f97316" }}>⚠</span>}
                    </span> : "—"}
                  </td>
                  <PriceCell raw={row.fd} norm={row.fdNorm} unit={row.fdUnit} isWinner={winner==="FD"} color={RC.FD} />
                  <td style={{ padding:"2px", textAlign:"center" }}><OrgBadge org={row.fdOrg} /></td>
                  <td style={{ padding:"6px 4px", textAlign:"center" }}><UnitBadge match={row.unitMatch} normUnit={row.normUnit} /></td>
                  <td style={{ padding:"6px 5px", color:"#52525b", fontSize:10, maxWidth:200, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{row.note}</td>
                </tr>,
                isExp && (
                  <tr key={`${idx}-d`} style={{ background:"#111114" }}>
                    <td colSpan={11} style={{ padding:"12px 16px", borderBottom:"1px solid #1c1c22" }}>
                      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))", gap:12 }}>
                        {[
                          {name:"PSFC",raw:row.psfc,norm:row.psfcNorm,unit:row.psfcUnit,org:row.psfcOrg,color:RC.PSFC,desc:"Park Slope Food Coop"},
                          {name:"Farm to People",raw:row.ftp,norm:row.ftpNorm,unit:row.ftpUnit,org:row.ftpOrg,color:RC.FTP,desc:"Farm-direct delivery"},
                          {name:"FreshDirect",raw:row.fd,norm:row.fdNorm,unit:row.fdUnit,org:row.fdOrg,color:RC.FD,desc:"Scale delivery"},
                        ].map((r,ri) => {
                          const hasN = r.norm!=null&&r.raw!=null&&Math.abs(r.norm-r.raw)>0.005;
                          const disp = r.norm??r.raw;
                          return (
                            <div key={ri} style={{ background:"#0c0c0f", borderRadius:8, padding:12, border:`1px solid ${disp!=null?r.color+"33":"#1c1c22"}` }}>
                              <div style={{ fontSize:10, color:r.color, fontWeight:700, textTransform:"uppercase", letterSpacing:1 }}>{r.name}</div>
                              <div style={{ fontSize:9, color:"#3f3f46", marginBottom:6 }}>{r.desc}</div>
                              {disp!=null ? <>
                                <div style={{ fontSize:20, fontWeight:700, fontFamily:"'JetBrains Mono',monospace", color:"#fafafa" }}>
                                  ${disp.toFixed(2)}{row.normUnit&&row.unitMatch==="close"?<span style={{ fontSize:11, color:"#71717a" }}> {row.normUnit}</span>:null}
                                </div>
                                {hasN && <div style={{ fontSize:10, color:"#52525b", marginTop:2, fontFamily:"'JetBrains Mono',monospace" }}>Original: ${r.raw.toFixed(2)} {r.unit}</div>}
                              </> : <div style={{ fontSize:20, fontWeight:700, color:"#27272a" }}>—</div>}
                              <div style={{ marginTop:6 }}><OrgBadge org={r.org} /></div>
                            </div>
                          );
                        })}
                      </div>
                      {row.note && <div style={{ marginTop:10, fontSize:11, color:"#71717a" }}>💡 {row.note}</div>}
                      <div style={{ marginTop:6, display:"flex", gap:8, alignItems:"center" }}>
                        <UnitBadge match={row.unitMatch} normUnit={row.normUnit} />
                        {row.unitMatch==="diff" && <span style={{ fontSize:10, color:"#ef4444" }}>⚠ Prices not directly comparable</span>}
                        {row.unitMatch==="close" && <span style={{ fontSize:10, color:"#facc15" }}>≈ Prices normalized to {row.normUnit||"common unit"} for comparison</span>}
                        {row.unitMatch==="exact" && <span style={{ fontSize:10, color:"#22c55e" }}>Direct comparison — same unit</span>}
                      </div>
                    </td>
                  </tr>
                )
              ];
            })}
          </tbody>
        </table>
      </div>
      <div style={{ padding:"12px 24px 20px", borderTop:"1px solid #1c1c22", fontSize:10, color:"#52525b", lineHeight:1.8 }}>
        <strong style={{ color:"#71717a" }}>Reading prices:</strong> Bold = comparable price (normalized if converted). <span style={{ color:"#52525b" }}>(dimmed)</span> = original as-sold.
        &nbsp;·&nbsp; <span style={{ color:"#f97316" }}>⚠</span> = different organic status &nbsp;·&nbsp; <span style={{ color:"#ef4444" }}>✗</span> = different units
        &nbsp;·&nbsp; <strong style={{ color:"#71717a" }}>Organic:</strong> {Object.entries(ORG_LABELS).map(([k,v])=><span key={k} style={{ marginRight:6 }}><span style={{ color:ORG_COLORS[k] }}>●</span> {v}</span>)}
      </div>
      </>}
      {tab === "summary" && <ExecSummary stats={stats} />}
      {tab === "basket" && <BasketCost />}
      {tab === "psfc" && <RetailerList data={PSFC} search={search} color={RC.PSFC} name={`Park Slope Food Coop — ${PSFC.length} items · Daily Price List March 27, 2026`} />}
      {tab === "ftp" && <RetailerList data={FTP} search={search} color={RC.FTP} name={`Farm to People — ${FTP.length} items · Logged-in prices March 27, 2026`} />}
      {tab === "fd" && <RetailerList data={FD} search={search} color={RC.FD} name={`FreshDirect — ${FD.length} items · Search prices March 28, 2026`} />}
      </>}
    </div>
  );
}
