export enum Sex {
  Male = "m",
  Female = "f",
}
interface FoodItem {
  name: string;
  caloriesPerServing: number;
  servingsPerDay: number;
}

const KCAL_PER_KG_BODY_FAT = 9000;

const foodItems: FoodItem[] = [
  { name: "Kellogg's Tresor",                caloriesPerServing: 137, servingsPerDay: 4  },
  { name: "Weihenstephan Haltbare Milch",    caloriesPerServing:  64, servingsPerDay: 8  },
  { name: "Mühle Frikadellen",               caloriesPerServing: 271, servingsPerDay: 4  },
  { name: "Volvic Tee",                      caloriesPerServing:  40, servingsPerDay: 12 },
  { name: "Neuburger lockerer Sahnepudding", caloriesPerServing: 297, servingsPerDay: 1  },
  { name: "Lagnese Viennetta",               caloriesPerServing: 125, servingsPerDay: 6  },
  { name: "Schöller 10ForTwo",               caloriesPerServing: 482, servingsPerDay: 2  },
  { name: "Ristorante Pizza Salame",         caloriesPerServing: 835, servingsPerDay: 2  },
  { name: "Schweppes Ginger Ale",            caloriesPerServing:  37, servingsPerDay: 25 },
  { name: "Mini Babybel",                    caloriesPerServing:  59, servingsPerDay: 20 },
];


export function calcDateOnDiet(
  currentWeightKg: number,
  targetWeightKg: number,
  heightM: number,
  ageY: number,
  sex: Sex,
): number {
  const weightGainKg = targetWeightKg - currentWeightKg;
  if (weightGainKg < 0) {
    throw new Error(`This diet is for gaining weight, not losing it!`);
  }
  if (ageY < 16 || heightM < 1.5) {
    throw new Error(`You do not qualify for this kind of diet.`);
  }
  const dailyCaloriesOnDiet = foodItems.reduce(
    (sum, item) => sum + item.caloriesPerServing * item.servingsPerDay,
    0,
  );
  let dailyCaloriesBasicMetabolicRate = 0;
  if (sex === Sex.Male) {
    dailyCaloriesBasicMetabolicRate = Math.ceil(
      // Harris-Benedict-Formula (Male)
      66.47 + 13.7 * currentWeightKg + 5.003 * heightM * 100.0 - 6.75 * ageY,
    );
  } else {
    dailyCaloriesBasicMetabolicRate = Math.ceil(
      // Harris-Benedict-Formula (Female)
      655.1 + 9.563 * currentWeightKg + 1.85 * heightM * 100.0 - 4.676 * ageY,
    );
  }
  const dailyExcessCalories =
    dailyCaloriesOnDiet - dailyCaloriesBasicMetabolicRate;
  if (dailyExcessCalories <= 0) {
    throw new Error("This diet is not sufficient for you to gain weight.");
  }
  return Math.ceil((KCAL_PER_KG_BODY_FAT * weightGainKg) / dailyExcessCalories);
}