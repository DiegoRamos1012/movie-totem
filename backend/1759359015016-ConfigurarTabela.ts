import { MigrationInterface, QueryRunner } from "typeorm";

export class ConfigurarTabela1759359015016 implements MigrationInterface {
    name = 'ConfigurarTabela1759359015016'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."snack_category_enum" AS ENUM('pipoca', 'bebida', 'doce', 'combo', 'outros')`);
        await queryRunner.query(`CREATE TYPE "public"."snack_size_enum" AS ENUM('pequeno', 'medio', 'grande', 'balde')`);
        await queryRunner.query(`CREATE TABLE "snack" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "description" text NOT NULL, "category" "public"."snack_category_enum" NOT NULL, "size" "public"."snack_size_enum", "price" numeric(10,2) NOT NULL, "imageUrl" character varying(200), "calories" integer NOT NULL DEFAULT '0', "ingredients" text, "allergens" text, "available" boolean NOT NULL DEFAULT true, "stockQuantity" integer NOT NULL DEFAULT '0', "isCombo" boolean NOT NULL DEFAULT false, "comboItems" text, "discountPercentage" numeric(5,2), "active" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_786c53b7136bb6a5947fb5f88e8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."movie_rating_enum" AS ENUM('0', '10', '12', '14', '16', '18')`);
        await queryRunner.query(`CREATE TABLE "movie" ("id" SERIAL NOT NULL, "name" character varying(200) NOT NULL, "original_name" character varying(200) NOT NULL, "casting" text NOT NULL, "direction" character varying(200) NOT NULL, "synopsis" text NOT NULL, "genre" character varying(50) NOT NULL, "duration" integer NOT NULL, "rating" "public"."movie_rating_enum" NOT NULL, "release_date" date NOT NULL, "poster_url" character varying(500), "active" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "seat" ("id" SERIAL NOT NULL, "row" character varying(2) NOT NULL, "number" integer NOT NULL, "code" character varying(5) NOT NULL, "occupied" boolean NOT NULL DEFAULT false, "theater_id" integer NOT NULL, "screening_id" integer, CONSTRAINT "PK_4e72ae40c3fbd7711ccb380ac17" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "theater" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "capacity" integer NOT NULL, CONSTRAINT "PK_c70874202894cfb1575a5b2b743" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "screening" ("id" SERIAL NOT NULL, "movie_id" integer NOT NULL, "theater_id" integer NOT NULL, "screening_time" TIMESTAMP NOT NULL, "available_seats" integer NOT NULL, "ticketPrice" numeric(10,2) NOT NULL, "active" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_5111bc526c9133721aeffb9a578" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ticket" ("id" SERIAL NOT NULL, "screening_id" integer NOT NULL, "seat_id" integer NOT NULL, "purchaseTime" TIMESTAMP NOT NULL DEFAULT now(), "price" numeric(10,2) NOT NULL, CONSTRAINT "PK_d9a0835407701eb86f874474b7c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "seat" ADD CONSTRAINT "FK_0edb471decb8a346f971ebec3c4" FOREIGN KEY ("theater_id") REFERENCES "theater"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "seat" ADD CONSTRAINT "FK_2494098be5b803a7e2533e83941" FOREIGN KEY ("screening_id") REFERENCES "screening"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "screening" ADD CONSTRAINT "FK_f6541a70adcd0716eef90407526" FOREIGN KEY ("movie_id") REFERENCES "movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "screening" ADD CONSTRAINT "FK_49df3440664209ed85e2a234fea" FOREIGN KEY ("theater_id") REFERENCES "theater"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD CONSTRAINT "FK_234870b0ed0576b52a31d8c52ca" FOREIGN KEY ("screening_id") REFERENCES "screening"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD CONSTRAINT "FK_bc6a9497287b609dbd2806850c7" FOREIGN KEY ("seat_id") REFERENCES "seat"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket" DROP CONSTRAINT "FK_bc6a9497287b609dbd2806850c7"`);
        await queryRunner.query(`ALTER TABLE "ticket" DROP CONSTRAINT "FK_234870b0ed0576b52a31d8c52ca"`);
        await queryRunner.query(`ALTER TABLE "screening" DROP CONSTRAINT "FK_49df3440664209ed85e2a234fea"`);
        await queryRunner.query(`ALTER TABLE "screening" DROP CONSTRAINT "FK_f6541a70adcd0716eef90407526"`);
        await queryRunner.query(`ALTER TABLE "seat" DROP CONSTRAINT "FK_2494098be5b803a7e2533e83941"`);
        await queryRunner.query(`ALTER TABLE "seat" DROP CONSTRAINT "FK_0edb471decb8a346f971ebec3c4"`);
        await queryRunner.query(`DROP TABLE "ticket"`);
        await queryRunner.query(`DROP TABLE "screening"`);
        await queryRunner.query(`DROP TABLE "theater"`);
        await queryRunner.query(`DROP TABLE "seat"`);
        await queryRunner.query(`DROP TABLE "movie"`);
        await queryRunner.query(`DROP TYPE "public"."movie_rating_enum"`);
        await queryRunner.query(`DROP TABLE "snack"`);
        await queryRunner.query(`DROP TYPE "public"."snack_size_enum"`);
        await queryRunner.query(`DROP TYPE "public"."snack_category_enum"`);
    }

}
