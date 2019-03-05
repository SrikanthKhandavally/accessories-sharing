const Item = require('../models/item');

const cat1Item1 = new Item("9870", "Microwave", "Eletric Applicances", "5", "microwave.png",
                  `This electric product helps in heating up any kind of food items within a less amount of time by
                  using microwaves produced electrically`,
                  `Place the microwave on a flat, dry surface. A clean counter in your kitchen or a solid, wooden table would be good for the microwave.
                    Do not put the microwave near a gas or electric range
                    Check that the roller ring and glass tray are secure in the microwave
                    The glass tray should spin around on the roller ring easily and smoothly.
                    Place the bowl with contents safely in the microwave and set the mode and timer.
                    After it is done take it out carefully and enjoy the food`,
                  `Any bowls with the microwave protection enabled can be put inside this device to heat the food
                    This device has multiple modes of usage namely cooking mode, defrost mode, re-heat mode, Pizza mode, custom heat mode and slow-heat mode
                    This device has clear count down timer to display time remaining for cooking
                    This device beeps twice when the assigned job is done, which helps us to be reminded of the food kept inside`);

const cat1Item2 = new Item("9871", "Bread Toast", "Eletric Applicances", "4", "bread-toast.png",
                  "This electric product helps in toasting the bread",
                  `Slide one slice of bread into each toaster slot. You can also toast just one slice of bread. In this case, choose a slot, and slide it in. The direction you orient the slice in doesn't matter, but most people like to insert it bottom-first
                  Use the adjustment knob on the front of the appliance to choose how dark you want the toast to be. On most toasters, the dial runs from 1 to 5, with 1 being the lightest, and 5 being the darkest
                  Lower the lever to start the toasting cycle. Wait for the food to toast
                  Remove the food. When the lever pops back up`,
                  `5 heating modes: Get the desired colour and crispiness for your toasts easily
                  Removable crumb tray for convenient and easy cleaning
                  With wide slots, you can easily cook up to 2 slices at a time
                  Cancel the toasting process any time`);

const cat1Item3 = new Item("9872", "Vaccum Cleaner", "Eletric Applicances", "4", "vaccum-cleaner.png",
                  "This electric product helps in cleaning up your floors especially covered with carpets in a very easy way",
                  `Always check Vaccum pipe length setting before tackling your carpets
                  Move All Of The Smaller Items Out
                  Turn The Vacuum On
                  Wash The Vacuum Brush
                  Dry The Bristle Brush`,
                  `Powerful 1200W motor provides plenty of suction power with no drop in performance
                  In open areas, outdoors you can use powerful blower function which throw out the dust, dirt far
                  High-filtration cloth dust bag that can be washed and reused. Suction Power (Watt)-180. Wind Volume of Flow (m3/min)-1.45. Noise Level (Max.) Db-75`
                  );

const cat2Item1 = new Item("9873", "Chair", "Furniture", "3", "chair.png",
                  "Single seated chair made of non-plastic base with metal legs",
                  `Place the chair on any flat surface
                  Make sure the chair legs have stoppings at the bottom`,
                  `Premium Executive Chair with equisite finish
                  One touch Tilt-&-Lock Mechanism with Pressure Hydraulic
                  Height: 40" Length:24" Depth: 20" Colour: Midnight Black`
                  );

const cat2Item2 = new Item("9874", "Study Table", "Furniture", "5", "table.png",
                  "Wodden table flexible for studying and placing laptop/notebooks",
                  `Place the table on the flat surface
                  Place the chair by the wall to make sure things don't fall from the behind`,
                  `Product Dimensions: Length (46 Inches / 116 CMs), Width (22 Inches / 57 CMs), Height (28 Inches / 72 CMs)
                  Color: Dark Wenge, Finish: Matte Finish, Style: Contemporary`
                  );

const cat2Item3 = new Item("9875", "Dining Table", "Furniture", "2", "dining-table.png",
                  "Wooden table which can be used as dining table which can accommodate 4 people at a time",
                  `Place the table on the flat surface
                  Make sure to keep only 4 chairs around the table to feel spacious around`,
                  `Table Dimensions : Length 40 inch x Width 30 inch x H 30 inch; Chair Dimensions: Length 17.5 inch x Width 17.5 inch x Height 34 inch; Seating Height - 18
                  Primary Material : Sheesham Wood |Color: Teak Finish | Style: Modern`
                  );

allItemsData = [cat1Item1, cat1Item2, cat1Item3, cat2Item1, cat2Item2, cat2Item3];

module.exports.allItemsData = allItemsData;
