import { assertGreater } from "@std/assert";
import { calcDateOnDiet, Sex } from "./tanzverbot_diet.ts";

Deno.test("Tanzverbot Diet", () => {
  assertGreater(calcDateOnDiet(74, 100, 1.86, 38, Sex.Male), 0.0);
});

Deno.test("Tanzverbot Diet", () => {
  assertGreater(calcDateOnDiet(60, 100, 1.86, 38, Sex.Female), 0.0);
});
