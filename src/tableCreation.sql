CREATE TYPE testResult AS ENUM ('positive', 'negative', 'invalidsample');

create table testResults (
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

CREATE TABLE tokens (
	token varchar(255)
)