USE CapstonesNoRelation
GO

DROP PROC IF EXISTS GetAllInfo
GO
CREATE PROC GetAllInfo
AS
BEGIN
	SELECT * FROM INFO
END
GO

DROP PROC IF EXISTS GetInfoByID
GO
CREATE PROC GetInfoByID
@id INT
AS
BEGIN
	SELECT * FROM INFO WHERE Id = @id
END
GO

DROP PROC IF EXISTS GetInfoByAccountID
GO
CREATE PROC GetInfoByAccountID
@accountID INT
AS
BEGIN
	SELECT * FROM INFO WHERE AccountId = @accountID
END
GO

DROP PROC IF EXISTS CreateInfo
GO
CREATE PROC CreateInfo
@accountID INT, @height FLOAT, @weight FLOAT, @bustSize FLOAT, @waistSize FLOAT, @hipSize FLOAT, @skinColor INT
AS
BEGIN
	INSERT INTO Info(AccountId, height, [weight], BustSize, WaistSize, HipSize, SkinColor)
	OUTPUT inserted.*
	VALUES(@accountID, @height, @weight, @bustSize, @waistSize, @hipSize, @skinColor)
END
GO

DROP PROC IF EXISTS UpdateInfo
GO
CREATE PROC UpdateInfo
@id INT, @height FLOAT, @weight FLOAT, @bustSize FLOAT, @waistSize FLOAT, @hipSize FLOAT, @skinColor INT
AS
BEGIN
	UPDATE Info
	SET height = @height, weight = @weight, BustSize = @bustSize, WaistSize = @waistSize, HipSize = @hipSize, SkinColor = @skinColor
	WHERE Id = @id
END
GO

DROP PROC IF EXISTS DeleteInfoByID
GO
CREATE PROC DeleteInfoByID
@id INT
AS
BEGIN
	DELETE FROM Info WHERE Id = @id
END
GO

DROP PROC IF EXISTS DeleteInfoOfUser
GO
CREATE PROC DeleteInfoOfUser
@accountID INT
AS
BEGIN
	DELETE FROM Info WHERE AccountId = @accountID
END
GO

EXEC dbo.CreateInfo @accountID = 1,   -- int
                    @height = 160.0,    -- float
                    @weight = 58.0,    -- float
                    @bustSize = 88.0,  -- float
                    @waistSize = 65.0, -- float
                    @hipSize = 102.0,   -- float
                    @skinColor = 0    -- int

EXEC dbo.CreateInfo @accountID = 1,   -- int
                    @height = 150.0,    -- float
                    @weight = 45.0,    -- float
                    @bustSize = 88.0,  -- float
                    @waistSize = 65.0, -- float
                    @hipSize = 90.0,   -- float
                    @skinColor = 0    -- int

EXEC dbo.CreateInfo @accountID = 1,   -- int
                    @height = 158,    -- float
                    @weight = 56,    -- float
                    @bustSize = 100,  -- float
                    @waistSize = 66, -- float
                    @hipSize = 104,   -- float
                    @skinColor = 0    -- int

EXEC dbo.CreateInfo @accountID = 1,   -- int
                    @height = 173,    -- float
                    @weight = 78.5,    -- float
                    @bustSize = 115,  -- float
                    @waistSize = 81, -- float
                    @hipSize = 90,   -- float
                    @skinColor = 0    -- int

EXEC dbo.CreateInfo @accountID = 1,   -- int
                    @height = 166,    -- float
                    @weight = 68,    -- float
                    @bustSize = 108,  -- float
                    @waistSize = 74, -- float
                    @hipSize = 86,   -- float
                    @skinColor = 0    -- int