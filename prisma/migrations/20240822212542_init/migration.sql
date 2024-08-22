-- CreateEnum
CREATE TYPE "EntityPropType" AS ENUM ('CATEGORICAL', 'NUMERICAL', 'CHRONOLOGICAL', 'GEOGRAPHICAL');

-- CreateTable
CREATE TABLE "entity_kind" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "entity_kind_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "entity_prop" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "EntityPropType" NOT NULL,

    CONSTRAINT "entity_prop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Entity" (
    "id" SERIAL NOT NULL,
    "kind_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "external_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Entity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "entity_prop_value" (
    "entity_id" INTEGER NOT NULL,
    "entity_prop_id" INTEGER NOT NULL,
    "value" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "entity_prop_value_pkey" PRIMARY KEY ("entity_prop_id","entity_id")
);

-- CreateTable
CREATE TABLE "daily_entity" (
    "id" SERIAL NOT NULL,
    "day" TIMESTAMP(3) NOT NULL,
    "entity_id" INTEGER NOT NULL,

    CONSTRAINT "daily_entity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EntityKindToEntityProp" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "entity_kind_name_key" ON "entity_kind"("name");

-- CreateIndex
CREATE INDEX "entity_prop_value_entity_id_entity_prop_id_idx" ON "entity_prop_value"("entity_id", "entity_prop_id");

-- CreateIndex
CREATE UNIQUE INDEX "_EntityKindToEntityProp_AB_unique" ON "_EntityKindToEntityProp"("A", "B");

-- CreateIndex
CREATE INDEX "_EntityKindToEntityProp_B_index" ON "_EntityKindToEntityProp"("B");

-- AddForeignKey
ALTER TABLE "Entity" ADD CONSTRAINT "Entity_kind_id_fkey" FOREIGN KEY ("kind_id") REFERENCES "entity_kind"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "entity_prop_value" ADD CONSTRAINT "entity_prop_value_entity_id_fkey" FOREIGN KEY ("entity_id") REFERENCES "Entity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "entity_prop_value" ADD CONSTRAINT "entity_prop_value_entity_prop_id_fkey" FOREIGN KEY ("entity_prop_id") REFERENCES "entity_prop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "daily_entity" ADD CONSTRAINT "daily_entity_entity_id_fkey" FOREIGN KEY ("entity_id") REFERENCES "Entity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EntityKindToEntityProp" ADD CONSTRAINT "_EntityKindToEntityProp_A_fkey" FOREIGN KEY ("A") REFERENCES "entity_kind"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EntityKindToEntityProp" ADD CONSTRAINT "_EntityKindToEntityProp_B_fkey" FOREIGN KEY ("B") REFERENCES "entity_prop"("id") ON DELETE CASCADE ON UPDATE CASCADE;
