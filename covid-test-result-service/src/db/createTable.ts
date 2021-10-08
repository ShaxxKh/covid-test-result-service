import db from "./db";

export default async function createTables () {
    await db.query( `
    DO
    $$
    BEGIN
    IF NOT EXISTS (SELECT *
                            FROM pg_type typ
                                INNER JOIN pg_namespace nsp
                                            ON nsp.oid = typ.typnamespace
                            where typ.typname = 'testresult') THEN
        CREATE TYPE testResult AS ENUM ('positive', 'negative', 'invalidsample');
    END IF;
    END;
    $$
    LANGUAGE plpgsql;

    create table if not exists testResults (
        appointmentId varchar(12),
        appointmentStart timestamp,
        appointmentEnd timestamp,
        concernId uuid,
        concernDescription varchar(255),
        locationId uuid,
        locationName varchar(255),
        firstname varchar(255),
        lastname varchar(255),
        birthDate date,
        eMail varchar(255),
        mobileNumber varchar(255),
        acceptedPrivacyDeclaration varchar(255),
        acceptedTermsOfUse varchar(255),
        testId varchar(255),
        testResult testResult,
        testDateTime timestamp
    )
`);
    await db.query( `
    CREATE TABLE if not exists tokens (
        token varchar(255)
    )
        `);
}
