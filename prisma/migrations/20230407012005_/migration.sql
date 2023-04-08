-- CreateTable
CREATE TABLE "Example" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);
-- CreateTable
CREATE TABLE "Recipe" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cookTime" TEXT NOT NULL,
    "cuisine" TEXT NOT NULL,
    "vegan" BOOLEAN NOT NULL,
    "rating" INTEGER NOT NULL,
    CONSTRAINT "Recipe_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
-- CreateTable
CREATE TABLE "Restriction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "recipeId" TEXT NOT NULL,
    CONSTRAINT "Restriction_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
-- CreateTable
CREATE TABLE "Ingredient" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "amount" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "recipeId" TEXT NOT NULL,
    CONSTRAINT "Ingredient_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
-- CreateTable
CREATE TABLE "Instruction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "step" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "recipeId" TEXT NOT NULL,
    CONSTRAINT "Instruction_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
-- CreateTable
CREATE TABLE "DishType" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "recipeId" TEXT NOT NULL,
    CONSTRAINT "DishType_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
-- CreateTable
CREATE TABLE "Allergen" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "recipeId" TEXT NOT NULL,
    CONSTRAINT "Allergen_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
-- CreateIndex
CREATE UNIQUE INDEX "Restriction_name_key" ON "Restriction"("name");
-- CreateIndex
CREATE INDEX "restriction_recipeId" ON "Restriction"("recipeId");
-- CreateIndex
CREATE INDEX "ingredient_recipeId" ON "Ingredient"("recipeId");
-- CreateIndex
CREATE INDEX "instruction_recipeId" ON "Instruction"("recipeId");
-- CreateIndex
CREATE UNIQUE INDEX "DishType_name_key" ON "DishType"("name");
-- CreateIndex
CREATE INDEX "dishType_recipeId" ON "DishType"("recipeId");
-- CreateIndex
CREATE UNIQUE INDEX "Allergen_name_key" ON "Allergen"("name");
-- CreateIndex
CREATE INDEX "allergen_recipeId" ON "Allergen"("recipeId");