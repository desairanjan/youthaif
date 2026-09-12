-- YouthAIF Database Schema
-- Run against SQL Server (LocalDB or full instance)

IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'YouthAIFDb')
BEGIN
    CREATE DATABASE YouthAIFDb;
END
GO

USE YouthAIFDb;
GO

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'SevathonVisitors')
BEGIN
    CREATE TABLE SevathonVisitors (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        FullName NVARCHAR(200) NOT NULL,
        Email NVARCHAR(200) NOT NULL,
        Phone NVARCHAR(50) NULL,
        Organization NVARCHAR(200) NULL,
        Interests NVARCHAR(500) NULL,
        WantsNewsletter BIT NOT NULL DEFAULT 0,
        CheckedInAt DATETIME2 NOT NULL DEFAULT GETUTCDATE()
    );
END
GO

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'NewsletterSubscribers')
BEGIN
    CREATE TABLE NewsletterSubscribers (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Email NVARCHAR(200) NOT NULL,
        FullName NVARCHAR(200) NULL,
        NewsletterType NVARCHAR(100) NOT NULL,
        SubscribedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE()
    );

    CREATE UNIQUE INDEX IX_NewsletterSubscribers_Email_Type
        ON NewsletterSubscribers (Email, NewsletterType);
END
GO
