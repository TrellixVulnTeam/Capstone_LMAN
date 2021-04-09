USE [CapstonesNoRelation]
GO
/****** Object:  StoredProcedure [dbo].[UpdateUserPassword]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP PROCEDURE [dbo].[UpdateUserPassword]
GO
/****** Object:  StoredProcedure [dbo].[UpdateRate]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP PROCEDURE [dbo].[UpdateRate]
GO
/****** Object:  StoredProcedure [dbo].[UpdateProfileByAccountID]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP PROCEDURE [dbo].[UpdateProfileByAccountID]
GO
/****** Object:  StoredProcedure [dbo].[UpdatePost]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP PROCEDURE [dbo].[UpdatePost]
GO
/****** Object:  StoredProcedure [dbo].[UpdateInfo]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP PROCEDURE [dbo].[UpdateInfo]
GO
/****** Object:  StoredProcedure [dbo].[UpdateImagePostByID]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP PROCEDURE [dbo].[UpdateImagePostByID]
GO
/****** Object:  StoredProcedure [dbo].[UpdateImage]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP PROCEDURE [dbo].[UpdateImage]
GO
/****** Object:  StoredProcedure [dbo].[UpdateComment]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP PROCEDURE [dbo].[UpdateComment]
GO
/****** Object:  StoredProcedure [dbo].[UnlikePost]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP PROCEDURE [dbo].[UnlikePost]
GO
/****** Object:  StoredProcedure [dbo].[topUpForAccount]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP PROCEDURE [dbo].[topUpForAccount]
GO
/****** Object:  StoredProcedure [dbo].[LikePost]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP PROCEDURE [dbo].[LikePost]
GO
/****** Object:  StoredProcedure [dbo].[getVoucherDetailByAccountId]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP PROCEDURE [dbo].[getVoucherDetailByAccountId]
GO
/****** Object:  StoredProcedure [dbo].[getVoucherByAccountID]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP PROCEDURE [dbo].[getVoucherByAccountID]
GO
/****** Object:  StoredProcedure [dbo].[GetUserWithRoleByUserName]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP PROCEDURE [dbo].[GetUserWithRoleByUserName]
GO
/****** Object:  StoredProcedure [dbo].[GetUserWithRoleByPhone]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP PROCEDURE [dbo].[GetUserWithRoleByPhone]
GO
/****** Object:  StoredProcedure [dbo].[GetUserWithRoleByEmail]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP PROCEDURE [dbo].[GetUserWithRoleByEmail]
GO
/****** Object:  StoredProcedure [dbo].[GetUserByUserName]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP PROCEDURE [dbo].[GetUserByUserName]
GO
/****** Object:  StoredProcedure [dbo].[getTransactionHistoryByAccountID]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP PROCEDURE [dbo].[getTransactionHistoryByAccountID]
GO
/****** Object:  StoredProcedure [dbo].[GetRateOfUserForPost]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP PROCEDURE [dbo].[GetRateOfUserForPost]
GO
/****** Object:  StoredProcedure [dbo].[GetProfileByUsername]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP PROCEDURE [dbo].[GetProfileByUsername]
GO
/****** Object:  StoredProcedure [dbo].[GetProfileByPhone]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP PROCEDURE [dbo].[GetProfileByPhone]
GO
/****** Object:  StoredProcedure [dbo].[GetProfileByEmail]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP PROCEDURE [dbo].[GetProfileByEmail]
GO
/****** Object:  StoredProcedure [dbo].[GetProfileByAccountID]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP PROCEDURE [dbo].[GetProfileByAccountID]
GO
/****** Object:  StoredProcedure [dbo].[GetPostRateAverage]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP PROCEDURE [dbo].[GetPostRateAverage]
GO
/****** Object:  StoredProcedure [dbo].[GetPostByID]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP PROCEDURE [dbo].[GetPostByID]
GO
/****** Object:  StoredProcedure [dbo].[getPeopleFollowByAccountID]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP PROCEDURE [dbo].[getPeopleFollowByAccountID]
GO
/****** Object:  StoredProcedure [dbo].[getMessageByConversationId]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP PROCEDURE [dbo].[getMessageByConversationId]
GO
/****** Object:  StoredProcedure [dbo].[GetMailContentByID]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP PROCEDURE [dbo].[GetMailContentByID]
GO
/****** Object:  StoredProcedure [dbo].[GetMailContentByCode]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP PROCEDURE [dbo].[GetMailContentByCode]
GO
/****** Object:  StoredProcedure [dbo].[GetLikeOfUserForPost]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP PROCEDURE [dbo].[GetLikeOfUserForPost]
GO
/****** Object:  StoredProcedure [dbo].[GetInfoByID]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP PROCEDURE [dbo].[GetInfoByID]
GO
/****** Object:  StoredProcedure [dbo].[GetInfoByAccountID]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP PROCEDURE [dbo].[GetInfoByAccountID]
GO
/****** Object:  StoredProcedure [dbo].[GetImagesOfPostByPostID]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP PROCEDURE [dbo].[GetImagesOfPostByPostID]
GO
/****** Object:  StoredProcedure [dbo].[GetImagePostByID]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP PROCEDURE [dbo].[GetImagePostByID]
GO
/****** Object:  StoredProcedure [dbo].[getBalanceByAccountID]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP PROCEDURE [dbo].[getBalanceByAccountID]
GO
/****** Object:  StoredProcedure [dbo].[GetAllRateOfPost]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP PROCEDURE [dbo].[GetAllRateOfPost]
GO
/****** Object:  StoredProcedure [dbo].[GetAllPublicPostOfUser]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP PROCEDURE [dbo].[GetAllPublicPostOfUser]
GO
/****** Object:  StoredProcedure [dbo].[GetAllPublicPost]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP PROCEDURE [dbo].[GetAllPublicPost]
GO
/****** Object:  StoredProcedure [dbo].[GetAllPostOfUser]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP PROCEDURE [dbo].[GetAllPostOfUser]
GO
/****** Object:  StoredProcedure [dbo].[GetAllLikeOfPost]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP PROCEDURE [dbo].[GetAllLikeOfPost]
GO
/****** Object:  StoredProcedure [dbo].[GetAllInfo]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP PROCEDURE [dbo].[GetAllInfo]
GO
/****** Object:  StoredProcedure [dbo].[GetAllCommentOfPost]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP PROCEDURE [dbo].[GetAllCommentOfPost]
GO
/****** Object:  StoredProcedure [dbo].[DeletePost]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP PROCEDURE [dbo].[DeletePost]
GO
/****** Object:  StoredProcedure [dbo].[DeleteOTP]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP PROCEDURE [dbo].[DeleteOTP]
GO
/****** Object:  StoredProcedure [dbo].[DeleteMailContentByID]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP PROCEDURE [dbo].[DeleteMailContentByID]
GO
/****** Object:  StoredProcedure [dbo].[DeleteMailContentByCode]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP PROCEDURE [dbo].[DeleteMailContentByCode]
GO
/****** Object:  StoredProcedure [dbo].[DeleteInfoOfUser]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP PROCEDURE [dbo].[DeleteInfoOfUser]
GO
/****** Object:  StoredProcedure [dbo].[DeleteInfoByID]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP PROCEDURE [dbo].[DeleteInfoByID]
GO
/****** Object:  StoredProcedure [dbo].[DeleteImagePostByImageID]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP PROCEDURE [dbo].[DeleteImagePostByImageID]
GO
/****** Object:  StoredProcedure [dbo].[DeleteComment]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP PROCEDURE [dbo].[DeleteComment]
GO
/****** Object:  StoredProcedure [dbo].[DeleteAllImagesPostByPostID]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP PROCEDURE [dbo].[DeleteAllImagesPostByPostID]
GO
/****** Object:  StoredProcedure [dbo].[CreateRate]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP PROCEDURE [dbo].[CreateRate]
GO
/****** Object:  StoredProcedure [dbo].[CreateInfo]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP PROCEDURE [dbo].[CreateInfo]
GO
/****** Object:  StoredProcedure [dbo].[CreateComment]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP PROCEDURE [dbo].[CreateComment]
GO
/****** Object:  StoredProcedure [dbo].[CrateRate]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP PROCEDURE [dbo].[CrateRate]
GO
/****** Object:  StoredProcedure [dbo].[CountLikeOfPost]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP PROCEDURE [dbo].[CountLikeOfPost]
GO
/****** Object:  StoredProcedure [dbo].[CountCommentOfPost]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP PROCEDURE [dbo].[CountCommentOfPost]
GO
/****** Object:  StoredProcedure [dbo].[AddVoucher]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP PROCEDURE [dbo].[AddVoucher]
GO
/****** Object:  StoredProcedure [dbo].[AddOTP]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP PROCEDURE [dbo].[AddOTP]
GO
/****** Object:  StoredProcedure [dbo].[AddNewPost]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP PROCEDURE [dbo].[AddNewPost]
GO
/****** Object:  StoredProcedure [dbo].[AddNewImage]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP PROCEDURE [dbo].[AddNewImage]
GO
/****** Object:  StoredProcedure [dbo].[AddNewAccount]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP PROCEDURE [dbo].[AddNewAccount]
GO
/****** Object:  StoredProcedure [dbo].[AddMailContent]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP PROCEDURE [dbo].[AddMailContent]
GO
/****** Object:  StoredProcedure [dbo].[AddImagePost]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP PROCEDURE [dbo].[AddImagePost]
GO
ALTER TABLE [dbo].[Comment] DROP CONSTRAINT [DF__Comment__Time__14E61A24]
GO
ALTER TABLE [dbo].[Account] DROP CONSTRAINT [DF_Account_IsBlock]
GO
ALTER TABLE [dbo].[Account] DROP CONSTRAINT [DF_Account_IsActive]
GO
/****** Object:  Table [dbo].[Voucher]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP TABLE [dbo].[Voucher]
GO
/****** Object:  Table [dbo].[TypeNotification]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP TABLE [dbo].[TypeNotification]
GO
/****** Object:  Table [dbo].[TypeAction]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP TABLE [dbo].[TypeAction]
GO
/****** Object:  Table [dbo].[TransactionType]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP TABLE [dbo].[TransactionType]
GO
/****** Object:  Table [dbo].[Transactions]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP TABLE [dbo].[Transactions]
GO
/****** Object:  Table [dbo].[Role]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP TABLE [dbo].[Role]
GO
/****** Object:  Table [dbo].[ReportType]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP TABLE [dbo].[ReportType]
GO
/****** Object:  Table [dbo].[ReportReason]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP TABLE [dbo].[ReportReason]
GO
/****** Object:  Table [dbo].[Report]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP TABLE [dbo].[Report]
GO
/****** Object:  Table [dbo].[RelationType]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP TABLE [dbo].[RelationType]
GO
/****** Object:  Table [dbo].[Reason]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP TABLE [dbo].[Reason]
GO
/****** Object:  Table [dbo].[Rate]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP TABLE [dbo].[Rate]
GO
/****** Object:  Table [dbo].[Profile]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP TABLE [dbo].[Profile]
GO
/****** Object:  Table [dbo].[Privacy]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP TABLE [dbo].[Privacy]
GO
/****** Object:  Table [dbo].[Post]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP TABLE [dbo].[Post]
GO
/****** Object:  Table [dbo].[OTP]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP TABLE [dbo].[OTP]
GO
/****** Object:  Table [dbo].[Notification]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP TABLE [dbo].[Notification]
GO
/****** Object:  Table [dbo].[MessageImage]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP TABLE [dbo].[MessageImage]
GO
/****** Object:  Table [dbo].[Message]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP TABLE [dbo].[Message]
GO
/****** Object:  Table [dbo].[MarkUpPost]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP TABLE [dbo].[MarkUpPost]
GO
/****** Object:  Table [dbo].[MailContent]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP TABLE [dbo].[MailContent]
GO
/****** Object:  Table [dbo].[Like]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP TABLE [dbo].[Like]
GO
/****** Object:  Table [dbo].[Info]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP TABLE [dbo].[Info]
GO
/****** Object:  Table [dbo].[Image]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP TABLE [dbo].[Image]
GO
/****** Object:  Table [dbo].[Conversation]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP TABLE [dbo].[Conversation]
GO
/****** Object:  Table [dbo].[Comment]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP TABLE [dbo].[Comment]
GO
/****** Object:  Table [dbo].[AccountVoucher]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP TABLE [dbo].[AccountVoucher]
GO
/****** Object:  Table [dbo].[AccountRole]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP TABLE [dbo].[AccountRole]
GO
/****** Object:  Table [dbo].[AccountRelation]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP TABLE [dbo].[AccountRelation]
GO
/****** Object:  Table [dbo].[AccountLogs]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP TABLE [dbo].[AccountLogs]
GO
/****** Object:  Table [dbo].[Account]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP TABLE [dbo].[Account]
GO
USE [master]
GO
/****** Object:  Database [CapstonesNoRelation]    Script Date: 3/20/2021 4:50:53 PM ******/
DROP DATABASE [CapstonesNoRelation]
GO
/****** Object:  Database [CapstonesNoRelation]    Script Date: 3/20/2021 4:50:53 PM ******/
CREATE DATABASE [CapstonesNoRelation]
GO
USE [CapstonesNoRelation]
GO
/****** Object:  Table [dbo].[Account]    Script Date: 3/20/2021 4:50:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Account](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserName] [nvarchar](50) NOT NULL,
	[Password] [nvarchar](max) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[IsBlock] [bit] NOT NULL,
 CONSTRAINT [PK_Account] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AccountLogs]    Script Date: 3/20/2021 4:51:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AccountLogs](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[AccountID] [int] NULL,
	[BeforeBalance] [decimal](18, 6) NULL,
	[AfterBalance] [decimal](18, 6) NULL,
	[CheckSum] [varchar](50) NULL,
	[TransactionId] [int] NOT NULL,
 CONSTRAINT [PK_AccountLogs] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AccountRelation]    Script Date: 3/20/2021 4:51:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AccountRelation](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[AccountId1] [int] NOT NULL,
	[AccountId2] [int] NOT NULL,
	[RelationType] [int] NOT NULL,
 CONSTRAINT [PK_AccountRelation] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AccountRole]    Script Date: 3/20/2021 4:51:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AccountRole](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[AccountId] [int] NOT NULL,
	[RoleId] [int] NOT NULL,
 CONSTRAINT [PK_AccountRole] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AccountVoucher]    Script Date: 3/20/2021 4:51:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AccountVoucher](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[AccountId] [int] NULL,
	[VoucherId] [int] NULL,
	[IsUsed] [bit] NULL,
 CONSTRAINT [PK_AccountVoucher] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Comment]    Script Date: 3/20/2021 4:51:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Comment](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[AccountId] [int] NOT NULL,
	[PostId] [int] NOT NULL,
	[Content] [nvarchar](max) NULL,
	[Time] [datetime] NULL,
 CONSTRAINT [PK_Comment] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Conversation]    Script Date: 3/20/2021 4:51:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Conversation](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[TimeCreate] [date] NOT NULL,
	[TimeUpdate] [date] NOT NULL,
	[AccountId1] [int] NOT NULL,
	[AccountId2] [int] NOT NULL,
	[Account1Delete] [bit] NOT NULL,
	[Account2Delete] [bit] NOT NULL,
 CONSTRAINT [PK_Conversation] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Image]    Script Date: 3/20/2021 4:51:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Image](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PostId] [int] NOT NULL,
	[Url] [nvarchar](max) NULL,
 CONSTRAINT [PK_Image] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Info]    Script Date: 3/20/2021 4:51:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Info](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[height] [float] NULL,
	[weight] [float] NULL,
	[AccountId] [int] NULL,
	[BustSize] [float] NULL,
	[WaistSize] [float] NULL,
	[HipSize] [float] NULL,
	[SkinColor] [int] NULL,
 CONSTRAINT [PK_Info] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Like]    Script Date: 3/20/2021 4:51:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Like](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PostId] [int] NULL,
	[AccountLike] [int] NULL,
 CONSTRAINT [PK_Like] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MailContent]    Script Date: 3/20/2021 4:51:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MailContent](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Code] [nvarchar](max) NOT NULL,
	[Subject] [nvarchar](max) NULL,
	[Content] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MarkUpPost]    Script Date: 3/20/2021 4:51:04 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MarkUpPost](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PostId] [int] NOT NULL,
	[AccountId] [int] NOT NULL,
 CONSTRAINT [PK_MarkUpPost] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Message]    Script Date: 3/20/2021 4:51:04 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Message](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[FromAccountId] [int] NOT NULL,
	[ToAccountId] [int] NOT NULL,
	[Content] [nvarchar](max) NOT NULL,
	[SenderDeleted] [bit] NOT NULL,
	[ReceiverDeleted] [bit] NOT NULL,
	[IsRead] [bit] NOT NULL,
	[ConversationId] [int] NULL,
	[Time] [date] NULL,
 CONSTRAINT [PK_Message] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MessageImage]    Script Date: 3/20/2021 4:51:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MessageImage](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[MessageId] [int] NOT NULL,
	[Url] [nvarchar](max) NULL,
 CONSTRAINT [PK_MessageImage] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Notification]    Script Date: 3/20/2021 4:51:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Notification](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[TypeNotification] [int] NOT NULL,
	[TypeAction] [int] NULL,
	[IsRead] [bit] NULL,
	[PostId] [int] NULL,
	[Content] [nvarchar](max) NULL,
	[FromAccount] [int] NULL,
	[ToAccount] [int] NULL,
 CONSTRAINT [PK_Notification] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[OTP]    Script Date: 3/20/2021 4:51:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OTP](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Code] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Post]    Script Date: 3/20/2021 4:51:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Post](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Content] [nvarchar](max) NOT NULL,
	[PrivacyID] [int] NOT NULL,
	[Time] [datetime] NULL,
	[AccountPost] [int] NULL,
	[BodyInfoID] [int] NULL,
 CONSTRAINT [PK_Post] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Privacy]    Script Date: 3/20/2021 4:51:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Privacy](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Description] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_Privacy] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Profile]    Script Date: 3/20/2021 4:51:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Profile](
	[AccountId] [int] NOT NULL,
	[FirstName] [nvarchar](50) NULL,
	[LastName] [nvarchar](50) NULL,
	[Gender] [bit] NULL,
	[DOB] [date] NULL,
	[Email] [nvarchar](50) NULL,
	[Phone] [nvarchar](50) NULL,
	[Address] [nvarchar](max) NULL,
	[Avatar] [nvarchar](max) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Rate]    Script Date: 3/20/2021 4:51:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Rate](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PostId] [int] NULL,
	[AccountRate] [int] NULL,
	[RatePoint] [int] NULL,
 CONSTRAINT [PK_Rate] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Reason]    Script Date: 3/20/2021 4:51:08 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Reason](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NULL,
	[Description] [nvarchar](max) NULL,
 CONSTRAINT [PK_Reason] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[RelationType]    Script Date: 3/20/2021 4:51:08 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RelationType](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Description] [nvarchar](max) NULL,
 CONSTRAINT [PK_RelationType] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Report]    Script Date: 3/20/2021 4:51:08 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Report](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[FromAccount] [int] NULL,
	[ToAccount] [int] NULL,
	[ToPost] [int] NULL,
	[ToComment] [int] NULL,
	[TypeReport] [int] NULL,
	[ReportContent] [nvarchar](max) NULL,
 CONSTRAINT [PK_Report] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ReportReason]    Script Date: 3/20/2021 4:51:09 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ReportReason](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ReportId] [int] NOT NULL,
	[ReasonId] [int] NOT NULL,
 CONSTRAINT [PK_ReportReason] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Feedback]    Script Date: 4/8/2021 4:51:09 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Feedback](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](max) NOT NULL,
	[Content] [nvarchar](max) NULL,
	[UserFeedbackId] [int] NOT NULL,
	[LastUpdated] [datetime] NOT NULL,
	[Status] [int] NOT NULL,  --1: Resolved, 2: Unresolved, 3: Rejected 
 CONSTRAINT [PK_Feedback] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ReportType]    Script Date: 3/20/2021 4:51:09 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ReportType](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NULL,
	[Description] [nvarchar](max) NULL,
 CONSTRAINT [PK_ReportType] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Role]    Script Date: 3/20/2021 4:51:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Role](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NULL,
	[Descriptioncription] [nvarchar](max) NULL,
 CONSTRAINT [PK_Role] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Transactions]    Script Date: 3/20/2021 4:51:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Transactions](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NULL,
	[Type] [int] NOT NULL,
	[Amount] [decimal](18, 6) NULL,
	[AdminId] [int] NULL,
	[Date] [datetime] NULL,
	[CheckSum] [varchar](10) NULL,
	[Description] [nvarchar](max) NULL,
 CONSTRAINT [PK_Transactions] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TransactionType]    Script Date: 3/20/2021 4:51:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TransactionType](
	[Id] [int] NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Description] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_TransactionType] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TypeAction]    Script Date: 3/20/2021 4:51:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TypeAction](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Description] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_TypeAction] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TypeNotification]    Script Date: 3/20/2021 4:51:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TypeNotification](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NULL,
	[Description] [nvarchar](max) NULL,
 CONSTRAINT [PK_TypeNotification] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Voucher]    Script Date: 3/20/2021 4:51:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Voucher](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Content] [nvarchar](max) NULL,
	[Image] [nvarchar](50) NULL,
	[FromDate] [date] NULL,
	[ToDate] [date] NULL,
	[IsExpires] [bit] NULL,
	[Code] [varchar](50) NULL,
	[Quantity] [int] NULL,
	[Title] [nvarchar](max) NULL,
	[Description] [nvarchar](max) NULL,
 CONSTRAINT [PK_Voucher] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[Account] ADD  CONSTRAINT [DF_Account_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[Account] ADD  CONSTRAINT [DF_Account_IsBlock]  DEFAULT ((0)) FOR [IsBlock]
GO
ALTER TABLE [dbo].[Comment] ADD  DEFAULT (getdate()) FOR [Time]
GO
/****** Object:  StoredProcedure [dbo].[AddImagePost]    Script Date: 3/20/2021 4:51:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[AddImagePost]
@postID INT, @url NVARCHAR(MAX)
AS
BEGIN
	INSERT INTO dbo.Image
	(
		PostId,
		Url
	)
	OUTPUT Inserted.*
	VALUES
	(   @postID,  -- PostId - int
		@url -- Url - nvarchar(max)
		)    
END
GO
/****** Object:  StoredProcedure [dbo].[AddMailContent]    Script Date: 3/20/2021 4:51:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[AddMailContent]
@code NVARCHAR(MAX), @subject NVARCHAR(MAX), @content NVARCHAR(MAX)
AS
BEGIN
	INSERT INTO dbo.MailContent
	(
	    Code,
	    Subject,
	    Content
	)
	OUTPUT Inserted.*
	VALUES
	(   @code, -- Code - nvarchar(max)
	    @subject, -- Subject - nvarchar(max)
	    @content  -- Content - nvarchar(max)
	    )
END
GO
/****** Object:  StoredProcedure [dbo].[AddNewAccount]    Script Date: 3/20/2021 4:51:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[AddNewAccount] @Username nvarchar(50), @Password nvarchar(MAX), @FirstName nvarchar(50), @LastName nvarchar(50) , @Email nvarchar(MAX), @Phone nvarchar(50), @RoleId int
AS
	INSERT INTO Account values(@Username, @Password, 1, 0)
	DECLARE @AccountID  AS int 
	SET @AccountID = SCOPE_IDENTITY()
	INSERT INTO Profile(AccountId, FirstName, LastName, Email, Phone) VALUES(@AccountID, @FirstName, @LastName, @Email, @Phone)
	INSERT INTO AccountRole(AccountId, RoleId) values(@AccountID, @RoleId)
GO
/****** Object:  StoredProcedure [dbo].[AddNewImage]    Script Date: 3/20/2021 4:51:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[AddNewImage]
@postID INT, @url NVARCHAR(MAX)
AS
BEGIN
	INSERT INTO dbo.Image
	(
	    PostId,
	    Url
	)
	OUTPUT Inserted.*
	VALUES
	(   @postID,  -- PostId - int
	    @url -- Url - nvarchar(max)
	)
END
GO
/****** Object:  StoredProcedure [dbo].[AddNewPost]    Script Date: 3/20/2021 4:51:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[AddNewPost]
@content NVARCHAR(MAX), @privacyID INT, @accountPost INT
AS
BEGIN
	INSERT INTO dbo.Post
	(
	    Content,
	    PrivacyID,
	    Time,
	    AccountPost
	)
	OUTPUT Inserted.*
	VALUES
	(   @content,       -- Content - nvarchar(max)
	    @privacyID,         -- PrivacyID - int
	    GETDATE(), -- Time - datetime
	    @accountPost          -- AccountPost - int
	    )
END
GO
/****** Object:  StoredProcedure [dbo].[AddOTP]    Script Date: 3/20/2021 4:51:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[AddOTP]
@code INT
AS
BEGIN
	INSERT dbo.OTP
	(
	    Code
	)
	OUTPUT Inserted.ID
	VALUES
	(@code)
END
GO
/****** Object:  StoredProcedure [dbo].[AddVoucher]    Script Date: 3/20/2021 4:51:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[AddVoucher]
@Title nvarchar(max), @code nvarchar(50) ,@content nvarchar(max),@Description nvarchar(max), @Image nvarchar(50), @FromDate date, @ToDate date, @IsExpress bit , @Quantity int 
as
Begin
SET NOCOUNT OFF;
  DECLARE @trancount int;
  SET @trancount = @@trancount;
	begin try
	 IF @trancount = 0
      BEGIN TRANSACTION
      ELSE
        SAVE TRANSACTION saveMyPoint;
INSERT INTO Voucher ([Title], [Code], [Content],[Description], [Image], [FromDate], [ToDate], [IsExpires], [Quantity])
values(@Title,@code,@content,@Description,@Image,@FromDate,@ToDate , @IsExpress, @Quantity)
IF @trancount = 0
      COMMIT;

	end try
	BEGIN CATCH
	 DECLARE @error int,
            @message varchar(4000),
            @xstate int;

    SELECT
      @error = ERROR_NUMBER(),
      @message = ERROR_MESSAGE(),
      @xstate = XACT_STATE();

    IF @xstate = -1
      ROLLBACK;
    IF @xstate = 1 AND @trancount = 0
      ROLLBACK
    IF @xstate = 1 AND @trancount > 0
		 ROLLBACK TRANSACTION saveMyPoint ;
		     RAISERROR ('addVoucher: %d: %s', 16, 1, @error, @message);
	End Catch
END
GO
/****** Object:  StoredProcedure [dbo].[CountCommentOfPost]    Script Date: 3/20/2021 4:51:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[CountCommentOfPost]
@postID INT
AS
BEGIN
    SELECT COUNT(*) AS NumberOfComment FROM dbo.Comment WHERE PostId = @postID
END
GO
/****** Object:  StoredProcedure [dbo].[CountLikeOfPost]    Script Date: 3/20/2021 4:51:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[CountLikeOfPost]
@postID INT
AS
BEGIN
    SELECT COUNT(*) AS NumberOfLike FROM dbo.[Like] WHERE PostId = @postID
END
GO
/****** Object:  StoredProcedure [dbo].[CrateRate]    Script Date: 3/20/2021 4:51:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[CrateRate]
@postID INT, @accountRate INT, @ratePoint INT
AS
BEGIN
	INSERT dbo.Rate
	(
	    PostId,
	    AccountRate,
	    RatePoint
	)
	VALUES
	(   @postID, -- PostId - int
	    @accountRate, -- AcountRate - int
	    @ratePoint  -- RatePoint - int
	    )
END
GO
/****** Object:  StoredProcedure [dbo].[CreateComment]    Script Date: 3/20/2021 4:51:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[CreateComment]
@accountID INT, @postID INT, @content NVARCHAR(MAX)
AS
BEGIN
	INSERT INTO dbo.Comment
	(
	    AccountId,
	    PostId,
	    Content,
		[Time]
	)
	OUTPUT inserted.*
	VALUES
	(   @accountID,  -- AccountId - int
	    @postID,  -- PostId - int
	    @content, -- Content - nvarchar(max)
		GETDATE()
	    )
END
GO
/****** Object:  StoredProcedure [dbo].[CreateInfo]    Script Date: 3/20/2021 4:51:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[CreateInfo]
@accountID INT, @height FLOAT, @weight FLOAT, @bustSize FLOAT, @waistSize FLOAT, @hipSize FLOAT, @skinColor INT
AS
BEGIN
	INSERT INTO Info(AccountId, height, [weight], BustSize, WaistSize, HipSize, SkinColor)
	OUTPUT inserted.*
	VALUES(@accountID, @height, @weight, @bustSize, @waistSize, @hipSize, @skinColor)
END
GO
/****** Object:  StoredProcedure [dbo].[CreateRate]    Script Date: 3/20/2021 4:51:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[CreateRate]
@postID INT, @accountRate INT, @ratePoint INT
AS
BEGIN
	DECLARE @rateID INT;
	SET @rateID = (SELECT ID FROM Rate WHERE PostID = @postID AND AccountRate = @accountRate);
	IF (@rateID IS NULL OR @rateID = 0) 
	BEGIN
		INSERT dbo.Rate VALUES(@postID, @accountRate, @ratePoint)
	END
	ELSE
	BEGIN
		UPDATE dbo.Rate SET RatePoint = @ratePoint WHERE ID = @rateID
	END
END
GO
/****** Object:  StoredProcedure [dbo].[DeleteAllImagesPostByPostID]    Script Date: 3/20/2021 4:51:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[DeleteAllImagesPostByPostID]
@postID INT
AS
BEGIN
	DELETE FROM dbo.Image WHERE PostId = @postID
END
GO
/****** Object:  StoredProcedure [dbo].[DeleteComment]    Script Date: 3/20/2021 4:51:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[DeleteComment]
@accountID INT, @postID INT
AS
BEGIN
	DELETE FROM dbo.Comment WHERE AccountId = @accountID AND PostId = @postID
END
GO
/****** Object:  StoredProcedure [dbo].[DeleteImagePostByImageID]    Script Date: 3/20/2021 4:51:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[DeleteImagePostByImageID]
@imageID INT
AS
BEGIN
	DELETE FROM dbo.Image WHERE Id = @imageID
END
GO
/****** Object:  StoredProcedure [dbo].[DeleteInfoByID]    Script Date: 3/20/2021 4:51:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[DeleteInfoByID]
@id INT
AS
BEGIN
	DELETE FROM Info WHERE Id = @id
END
GO
/****** Object:  StoredProcedure [dbo].[DeleteInfoOfUser]    Script Date: 3/20/2021 4:51:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[DeleteInfoOfUser]
@accountID INT
AS
BEGIN
	DELETE FROM Info WHERE AccountId = @accountID
END
GO
/****** Object:  StoredProcedure [dbo].[DeleteMailContentByCode]    Script Date: 3/20/2021 4:51:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[DeleteMailContentByCode]
@code NVARCHAR(MAX)
AS
BEGIN
	DELETE FROM dbo.MailContent WHERE Code = @code
END 
GO
/****** Object:  StoredProcedure [dbo].[DeleteMailContentByID]    Script Date: 3/20/2021 4:51:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[DeleteMailContentByID]
@id INT
AS
BEGIN
	DELETE FROM dbo.MailContent WHERE ID = @id
END 
GO
/****** Object:  StoredProcedure [dbo].[DeleteOTP]    Script Date: 3/20/2021 4:51:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[DeleteOTP]
@id INT
AS
BEGIN
	DELETE FROM OTP WHERE ID = @id
END
GO
/****** Object:  StoredProcedure [dbo].[DeletePost]    Script Date: 3/20/2021 4:51:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[DeletePost]
@postID INT
AS
BEGIN
	DELETE FROM dbo.Image WHERE PostId = @postID
	DELETE FROM dbo.Comment WHERE PostId = @postID
	DELETE FROM dbo.[Like] WHERE PostId = @postID
	DELETE FROM dbo.Rate WHERE PostId = @postID
	DELETE FROM dbo.MarkUpPost WHERE PostId = @postID
	DELETE FROM dbo.Post WHERE Id = @postID
END
GO
/****** Object:  StoredProcedure [dbo].[GetAllCommentOfPost]    Script Date: 3/20/2021 4:51:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[GetAllCommentOfPost]
@postID INT, @page INT, @rowsOfPage INT
AS
BEGIN
    SELECT * FROM dbo.Comment 
	WHERE PostId = @postID
	ORDER BY [Time] ASC
	OFFSET (@page-1)*@rowsOfPage ROWS
	FETCH NEXT @rowsOfPage ROWS ONLY
END
GO
/****** Object:  StoredProcedure [dbo].[GetAllInfo]    Script Date: 3/20/2021 4:51:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[GetAllInfo]
AS
BEGIN
	SELECT * FROM INFO
END
GO
/****** Object:  StoredProcedure [dbo].[GetAllLikeOfPost]    Script Date: 3/20/2021 4:51:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[GetAllLikeOfPost]
@postID INT
AS
BEGIN
	SELECT * FROM dbo.[Like]
	WHERE PostId = @postID
END
GO
/****** Object:  StoredProcedure [dbo].[GetAllPostOfUser]    Script Date: 3/20/2021 4:51:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[GetAllPostOfUser]
@accountPost INT, @page INT, @rowsOfPage INT
AS
BEGIN
	SELECT * FROM dbo.Post
	WHERE AccountPost = @accountPost
	ORDER BY [Time] DESC
	OFFSET (@page-1)*@rowsOfPage ROWS
	FETCH NEXT @rowsOfPage ROWS ONLY
END
GO
/****** Object:  StoredProcedure [dbo].[GetAllPublicPost]    Script Date: 3/20/2021 4:51:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[GetAllPublicPost]
@page INT, @rowsOfPage INT
AS
BEGIN
	SELECT id, content, privacyID, [time], accountPost FROM dbo.Post
	WHERE PrivacyID = (SELECT ID FROM Privacy WHERE Name = 'Public')
	ORDER BY [Time] DESC
	OFFSET (@page-1)*@rowsOfPage ROWS
	FETCH NEXT @rowsOfPage ROWS ONLY
END
GO
/****** Object:  StoredProcedure [dbo].[GetAllPublicPostOfUser]    Script Date: 3/20/2021 4:51:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[GetAllPublicPostOfUser]
@accountPost INT, @page INT, @rowsOfPage INT
AS
BEGIN
	SELECT * FROM dbo.Post
	WHERE AccountPost = @accountPost 
	AND PrivacyID = (SELECT ID FROM Privacy WHERE Name = 'Public')
	ORDER BY [Time] DESC
	OFFSET (@page-1)*@rowsOfPage ROWS
	FETCH NEXT @rowsOfPage ROWS ONLY
END
GO
/****** Object:  StoredProcedure [dbo].[GetAllRateOfPost]    Script Date: 3/20/2021 4:51:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[GetAllRateOfPost]
@postID INT
AS
BEGIN
    SELECT * FROM dbo.Rate
	WHERE PostId = @postID
END
GO
/****** Object:  StoredProcedure [dbo].[getBalanceByAccountID]    Script Date: 3/20/2021 4:51:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[getBalanceByAccountID]
@AccountID int
AS
BEGIN
SELECT TOP 1 [Balance] FROM (Select  accLogs.AfterBalance Balance,tr.[Date]
From Transactions tr, AccountLogs accLogs
Where accLogs.TransactionId = tr.Id and accLogs.AccountID= @AccountID
    UNION ALL
    SELECT 0 ,0)A ORDER BY [Date] DESC
END;
GO
/****** Object:  StoredProcedure [dbo].[GetImagePostByID]    Script Date: 3/20/2021 4:51:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[GetImagePostByID]
@id INT
AS
BEGIN
	SELECT * FROM dbo.Image WHERE Id = @id
END
GO
/****** Object:  StoredProcedure [dbo].[GetImagesOfPostByPostID]    Script Date: 3/20/2021 4:51:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[GetImagesOfPostByPostID]
@id INT
AS
BEGIN
	SELECT * FROM dbo.Image WHERE PostId = @id
END
GO
/****** Object:  StoredProcedure [dbo].[GetInfoByAccountID]    Script Date: 3/20/2021 4:51:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[GetInfoByAccountID]
@accountID INT
AS
BEGIN
	SELECT * FROM INFO WHERE AccountId = @accountID
END
GO
/****** Object:  StoredProcedure [dbo].[GetInfoByID]    Script Date: 3/20/2021 4:51:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[GetInfoByID]
@id INT
AS
BEGIN
	SELECT * FROM INFO WHERE Id = @id
END
GO
/****** Object:  StoredProcedure [dbo].[GetLikeOfUserForPost]    Script Date: 3/20/2021 4:51:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[GetLikeOfUserForPost]
@postID INT, @accountID INT
AS
BEGIN
		SELECT * FROM [Like] WHERE PostID = @postID AND AccountLike = @accountID 
END
GO
/****** Object:  StoredProcedure [dbo].[GetMailContentByCode]    Script Date: 3/20/2021 4:51:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[GetMailContentByCode]
@code NVARCHAR(MAX)
AS
BEGIN
    SELECT * FROM dbo.MailContent WHERE Code = @code
END
GO
/****** Object:  StoredProcedure [dbo].[GetMailContentByID]    Script Date: 3/20/2021 4:51:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[GetMailContentByID]
@id INT
AS
BEGIN
    SELECT * FROM dbo.MailContent WHERE ID = @id
END
GO
/****** Object:  StoredProcedure [dbo].[getMessageByConversationId]    Script Date: 3/20/2021 4:51:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[getMessageByConversationId]
@conversationId int
AS
BEGIN
SELECT Message.Id, Message.FromAccountId, Message.ToAccountId, Message.Content, Message.SenderDeleted, Message.ReceiverDeleted, Message.IsRead, Message.ConversationId,Message.Time, MessageImage.Url
  FROM dbo.Message
  LEFT OUTER JOIN dbo.MessageImage
  ON Message.Id = MessageImage.MessageId
  where Message.ConversationId = @conversationId
END
GO
/****** Object:  StoredProcedure [dbo].[getPeopleFollowByAccountID]    Script Date: 3/20/2021 4:51:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[getPeopleFollowByAccountID]  
@accountId int
AS 
BEGIN
SELECT AccountId1, FirstName, LastName, Avatar
FROM dbo.AccountRelation
INNER JOIN dbo.Profile
ON dbo.AccountRelation.AccountId1 = dbo.Profile.AccountId
WHERE dbo.AccountRelation.AccountId2 = @accountId
END  
GO
/****** Object:  StoredProcedure [dbo].[GetPostByID]    Script Date: 3/20/2021 4:51:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[GetPostByID]
@postID INT
AS
BEGIN
	SELECT Post.Id, Content, PrivacyID, [Name] AS Privacy, [Time], AccountPost, FirstName, LastName, Avatar 
	FROM dbo.Post
	INNER JOIN dbo.[Profile] ON AccountPost = dbo.[Profile].AccountId
	INNER JOIN dbo.Privacy ON Privacy.Id = PrivacyID
	WHERE Post.Id = @postID;
END
GO
/****** Object:  StoredProcedure [dbo].[GetPostRateAverage]    Script Date: 3/20/2021 4:51:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[GetPostRateAverage]
@postID INT
AS
BEGIN
	SELECT AVG(Cast(RatePoint as float)) FROM Rate WHERE PostID = @postID
END
GO
/****** Object:  StoredProcedure [dbo].[GetProfileByAccountID]    Script Date: 3/20/2021 4:51:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[GetProfileByAccountID]
@id INT
AS
BEGIN
	SELECT Account.Id, UserName, IsActive,IsBlock, Profile.AccountId, FirstName, LastName, Gender, DOB, Email, Phone, Address, Avatar, [Role].[Name] AS [role] FROM dbo.Account 
	INNER JOIN dbo.Profile ON Profile.AccountId = Account.Id
    INNER JOIN dbo.AccountRole ON AccountRole.AccountId = Account.Id
    INNER JOIN dbo.Role ON Role.Id = AccountRole.RoleId
	WHERE Account.Id = @id
END


GO
/****** Object:  StoredProcedure [dbo].[GetProfileByEmail]    Script Date: 3/20/2021 4:51:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[GetProfileByEmail]
@email VARCHAR(50)
AS
BEGIN
	SELECT Account.Id, UserName, IsActive,IsBlock, Profile.AccountId, FirstName, LastName, Gender, DOB, Email, Phone, Address, Avatar, [Role].[Name] AS [role] FROM dbo.Account 
	INNER JOIN dbo.Profile ON Profile.AccountId = Account.Id
	INNER JOIN dbo.AccountRole ON AccountRole.Id = Account.Id
	INNER JOIN dbo.Role ON Role.Id = AccountRole.Id
	WHERE Email = @email
END
GO
/****** Object:  StoredProcedure [dbo].[GetProfileByPhone]    Script Date: 3/20/2021 4:51:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[GetProfileByPhone]
@phone VARCHAR(50)
AS
BEGIN
	SELECT Account.Id, UserName, IsActive,IsBlock, Profile.AccountId, FirstName, LastName, Gender, DOB, Email, Phone, Address, Avatar, [Role].[Name] AS [role] FROM dbo.Account 
	INNER JOIN dbo.Profile ON Profile.AccountId = Account.Id
	INNER JOIN dbo.AccountRole ON AccountRole.Id = Account.Id
	INNER JOIN dbo.Role ON Role.Id = AccountRole.RoleId
	WHERE [Profile].Phone = @phone
END
GO
/****** Object:  StoredProcedure [dbo].[GetProfileByUsername]    Script Date: 3/20/2021 4:51:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[GetProfileByUsername]
@username VARCHAR(50)
AS
BEGIN
	SELECT Account.Id, UserName, IsActive,IsBlock, Profile.AccountId, FirstName, LastName, Gender, DOB, Email, Phone, Address, Avatar, [Role].[Name] AS [role] FROM dbo.Account 
	INNER JOIN dbo.Profile ON Profile.AccountId = Account.Id
	INNER JOIN dbo.AccountRole ON AccountRole.Id = Account.Id
	INNER JOIN dbo.Role ON Role.Id = AccountRole.Id
	WHERE UserName = @username
END
GO
/****** Object:  StoredProcedure [dbo].[GetRateOfUserForPost]    Script Date: 3/20/2021 4:51:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[GetRateOfUserForPost]
@postID INT, @accountID INT
AS
BEGIN
	SELECT * FROM RATE
	WHERE PostID = @postID AND AccountRate = @accountID
END
GO
/****** Object:  StoredProcedure [dbo].[getTransactionHistoryByAccountID]    Script Date: 3/20/2021 4:51:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[getTransactionHistoryByAccountID]
@AccountID int
AS
BEGIN
Select * From(	SELECT trans.Id TransactionId, accLogs.BeforeBalance, accLogs.AfterBalance, trans.Amount, trans.[Type] TypeID,tt.[Name] TypeName ,
trans.[Date] TransactionTime, trans.AdminId, accLogs.AccountId,(SELECT TOP 1 [Balance]
FROM (Select  accLogs.AfterBalance Balance,tr.[Date],tt.[Name] TypeName
From Transactions tr, AccountLogs accLogs 
Where accLogs.TransactionId = tr.Id  and accLogs.AccountID= @AccountID
    )A ORDER BY [Date] DESC) 'Balance Current'
From AccountLogs accLogs, Transactions trans,TransactionType tt
Where accLogs.TransactionId =trans.Id and trans.[Type]=tt.Id and accLogs.AccountID= @AccountID
UNION ALL
    SELECT -1 ,0,0,0,-1,null,getdate(),-1,0,0) as B
ORDER BY B.[TransactionTime] DESC
END;
GO
/****** Object:  StoredProcedure [dbo].[GetUserByUserName]    Script Date: 3/20/2021 4:51:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetUserByUserName] @Username nvarchar(50)
AS
	SELECT * FROM Account c WHERE c.UserName = @Username
GO
/****** Object:  StoredProcedure [dbo].[GetUserWithRoleByEmail]    Script Date: 3/20/2021 4:51:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetUserWithRoleByEmail] @Email nvarchar(50)
AS
	SELECT c.Id, c.UserName, c.Password, c.IsActive, c.IsBlock, p.Email, p.Phone, r.Id as RoleId, r.Name as RoleName
	FROM Profile p inner join Account c on p.AccountId = c.Id inner join AccountRole ar on c.Id = ar.AccountId inner join Role r on ar.RoleId = r.Id
	WHERE p.Email = @Email
GO
/****** Object:  StoredProcedure [dbo].[GetUserWithRoleByPhone]    Script Date: 3/20/2021 4:51:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetUserWithRoleByPhone] @Phone nvarchar(50)
AS
	SELECT c.Id, c.UserName, c.Password, c.IsActive, c.IsBlock, p.Email, p.Phone, r.Id as RoleId, r.Name as RoleName
	FROM Profile p inner join Account c on p.AccountId = c.Id inner join AccountRole ar on c.Id = ar.AccountId inner join Role r on ar.RoleId = r.Id
	WHERE p.Phone = @Phone
GO
/****** Object:  StoredProcedure [dbo].[GetUserWithRoleByUserName]    Script Date: 3/20/2021 4:51:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetUserWithRoleByUserName] @Username nvarchar(50)
AS
	SELECT c.Id, c.UserName, c.Password, c.IsActive, c.IsBlock, p.Email, p.Phone, r.Id as RoleId, r.Name as RoleName
	FROM Profile p inner join Account c on p.AccountId = c.Id inner join AccountRole ar on c.Id = ar.AccountId inner join Role r on ar.RoleId = r.Id
	WHERE c.UserName = @Username
GO
/****** Object:  StoredProcedure [dbo].[getVoucherByAccountID]    Script Date: 3/20/2021 4:51:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[getVoucherByAccountID]
@AccountId int, @IsExpires bit, @IsUsed bit
AS
Begin
select v.Id, v.Title, v.Code VoucherCode, v.Content, v.[Description],v.[Image],v.FromDate,v.ToDate,v.IsExpires, av.IsUsed
from Voucher v , AccountVoucher av
where  v.Id= av.VoucherId and av.AccountId=@AccountId and v.IsExpires=@IsExpires and av.IsUsed=@IsUsed
End
GO
/****** Object:  StoredProcedure [dbo].[getVoucherDetailByAccountId]    Script Date: 3/20/2021 4:51:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[getVoucherDetailByAccountId]
@AccountId int, @Id int
AS
Begin
select v.Id, v.Title, v.Code VoucherCode, v.Content, v.[Description],v.[Image],v.FromDate,v.ToDate,v.IsExpires, av.IsUsed
from Voucher v , AccountVoucher av
where  v.Id= av.VoucherId and av.AccountId=@AccountId and v.Id=@Id
End
GO
/****** Object:  StoredProcedure [dbo].[LikePost]    Script Date: 3/20/2021 4:51:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[LikePost]
@postID INT, @accountLike INT
AS
BEGIN
	INSERT INTO dbo.[Like]
	(
	    PostId,
	    AccountLike
	)
	VALUES
	(   @postID, -- PostId - int
	    @accountLike  -- AcountLike - int
	    )
END
GO
/****** Object:  StoredProcedure [dbo].[topUpForAccount]    Script Date: 3/20/2021 4:51:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[topUpForAccount]
@AccountID int, @Amount decimal(18,6), @AdminID int, @Description nvarchar(max)
As
BEGIN 
SET NOCOUNT OFF;
  DECLARE @trancount int;
  SET @trancount = @@trancount;
	begin try
	 IF @trancount = 0
      BEGIN TRANSACTION
      ELSE
        SAVE TRANSACTION saveMyPoint;
	DECLARE @checkSum varchar(10)=(SELECT Substring(( SELECT CONVERT(varchar(max),(select HASHBYTES('md5',CAST((select CURRENT_TIMESTAMP) AS binary))),2)),1,10));
	DECLARE @beforeBalance decimal(18,6)=(SELECT TOP 1 [Balance] FROM (Select  accLogs.AfterBalance Balance,tr.[Date]
From Transactions tr, AccountLogs accLogs
Where accLogs.TransactionId = tr.Id and accLogs.AccountID= @AccountID
    UNION ALL
    SELECT 0 ,0)A ORDER BY [Date] DESC)
		INSERT INTO Transactions ([Type], [Amount], [AdminId],[Date],[CheckSum] ,[Description])
		VALUES(1,@Amount,@AdminID,GETDATE(),@checkSum,@Description)
		insert into AccountLogs([AccountID],[BeforeBalance],[AfterBalance],[CheckSum],[TransactionId])
		values(@AccountID,@beforeBalance,@beforeBalance+@Amount,@checkSum,(Select TOP(1) ID from Transactions where [CheckSum]=@checkSum ))
		   lbexit:
      IF @trancount = 0
      COMMIT;

	end try
	BEGIN CATCH
	 DECLARE @error int,
            @message varchar(4000),
            @xstate int;

    SELECT
      @error = ERROR_NUMBER(),
      @message = ERROR_MESSAGE(),
      @xstate = XACT_STATE();

    IF @xstate = -1
      ROLLBACK;
    IF @xstate = 1 AND @trancount = 0
      ROLLBACK
    IF @xstate = 1 AND @trancount > 0
		 ROLLBACK TRANSACTION saveMyPoint ;
		     RAISERROR ('topUpAccount: %d: %s', 16, 1, @error, @message);
	End Catch
END
GO
/****** Object:  StoredProcedure [dbo].[UnlikePost]    Script Date: 3/20/2021 4:51:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[UnlikePost]
@postID INT, @accountLike INT
AS
BEGIN
	DELETE FROM dbo.[Like] WHERE PostId = @postID AND AccountLike = @accountLike
END
GO
/****** Object:  StoredProcedure [dbo].[UpdateComment]    Script Date: 3/20/2021 4:51:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[UpdateComment]
@accountID INT, @postID INT, @content NVARCHAR(MAX)
AS
BEGIN
	UPDATE dbo.Comment
	SET Content = @content
	WHERE AccountId = @accountID AND PostId = @postID
END
GO
/****** Object:  StoredProcedure [dbo].[UpdateImage]    Script Date: 3/20/2021 4:51:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[UpdateImage]
@imageID INT, @url NVARCHAR(MAX)
AS
BEGIN
	UPDATE [Image] SET [Url] = @url WHERE ID = @imageID
END
GO
/****** Object:  StoredProcedure [dbo].[UpdateImagePostByID]    Script Date: 3/20/2021 4:51:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[UpdateImagePostByID]
@id INT, @url NVARCHAR(MAX)
AS
BEGIN
	UPDATE dbo.Image SET [Url]=@url
END
GO
/****** Object:  StoredProcedure [dbo].[UpdateInfo]    Script Date: 3/20/2021 4:51:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[UpdateInfo]
@id INT, @height FLOAT, @weight FLOAT, @bustSize FLOAT, @waistSize FLOAT, @hipSize FLOAT, @skinColor INT
AS
BEGIN
	UPDATE Info
	SET height = @height, weight = @weight, BustSize = @bustSize, WaistSize = @waistSize, HipSize = @hipSize, SkinColor = @skinColor
	WHERE Id = @id
END
GO
/****** Object:  StoredProcedure [dbo].[UpdatePost]    Script Date: 3/20/2021 4:51:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[UpdatePost]
@postId INT, @content NVARCHAR(MAX), @privacyID INT, @time DATETIME
AS
BEGIN
	UPDATE dbo.Post 
	SET Content = @content, PrivacyID = @privacyID, Time = GETDATE()
	WHERE Id = @postId
END
GO
/****** Object:  StoredProcedure [dbo].[UpdateProfileByAccountID]    Script Date: 3/20/2021 4:51:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[UpdateProfileByAccountID]
(@accountID int, @firstName nvarchar(50), @lastName nvarchar(50), @gender bit, @dob date, @email nvarchar(50), @phone nvarchar(50), @address nvarchar(max))
AS
BEGIN
   UPDATE [dbo].[Profile]
   SET [FirstName] = @firstName
      ,[LastName] = @lastName
      ,[Gender] = @gender
      ,[DOB] = @dob
      ,[Email] = @email
      ,[Phone] = @phone
      ,[Address] = @address
 WHERE AccountId = @accountID
END
GO
/****** Object:  StoredProcedure [dbo].[UpdateRate]    Script Date: 3/20/2021 4:51:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[UpdateRate]
@postID INT, @accountRate INT, @ratePoint INT
AS
BEGIN
	UPDATE dbo.Rate 
	SET RatePoint = @ratePoint
	WHERE PostId = @postID AND AccountRate = @accountRate
END
GO
/****** Object:  StoredProcedure [dbo].[UpdateUserPassword]    Script Date: 3/20/2021 4:51:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[UpdateUserPassword] @Username nvarchar(50), @Password nvarchar(MAX)
AS
	UPDATE Account
	SET Password = @Password
	WHERE UserName = @Username;
GO
USE [master]
GO
ALTER DATABASE [CapstonesNoRelation] SET  READ_WRITE 
GO
USE CapstonesNoRelation
GO

INSERT INTO TransactionType([Id], [Name],[Description])
VALUES (1, 'Top Up Account', 'Top Up Account')


