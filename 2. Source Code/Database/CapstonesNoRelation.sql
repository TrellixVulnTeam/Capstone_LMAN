USE [master]
GO
/****** Object:  Database [CapstonesNoRelation]    Script Date: 1/27/2021 10:52:11 PM ******/
CREATE DATABASE [CapstonesNoRelation]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'CapstonesNoRelation', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\CapstonesNoRelation.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'CapstonesNoRelation_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\CapstonesNoRelation_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [CapstonesNoRelation] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [CapstonesNoRelation].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [CapstonesNoRelation] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [CapstonesNoRelation] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [CapstonesNoRelation] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [CapstonesNoRelation] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [CapstonesNoRelation] SET ARITHABORT OFF 
GO
ALTER DATABASE [CapstonesNoRelation] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [CapstonesNoRelation] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [CapstonesNoRelation] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [CapstonesNoRelation] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [CapstonesNoRelation] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [CapstonesNoRelation] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [CapstonesNoRelation] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [CapstonesNoRelation] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [CapstonesNoRelation] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [CapstonesNoRelation] SET  ENABLE_BROKER 
GO
ALTER DATABASE [CapstonesNoRelation] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [CapstonesNoRelation] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [CapstonesNoRelation] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [CapstonesNoRelation] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [CapstonesNoRelation] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [CapstonesNoRelation] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [CapstonesNoRelation] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [CapstonesNoRelation] SET RECOVERY FULL 
GO
ALTER DATABASE [CapstonesNoRelation] SET  MULTI_USER 
GO
ALTER DATABASE [CapstonesNoRelation] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [CapstonesNoRelation] SET DB_CHAINING OFF 
GO
ALTER DATABASE [CapstonesNoRelation] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [CapstonesNoRelation] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [CapstonesNoRelation] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'CapstonesNoRelation', N'ON'
GO
ALTER DATABASE [CapstonesNoRelation] SET QUERY_STORE = OFF
GO
USE [CapstonesNoRelation]
GO
/****** Object:  Table [dbo].[Account]    Script Date: 1/27/2021 10:52:13 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Account](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserName] [nvarchar](50) NOT NULL,
	[Password] [nvarchar](50) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[IsBlock] [bit] NOT NULL,
 CONSTRAINT [PK_Account] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AccountLogs]    Script Date: 1/27/2021 10:52:13 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AccountLogs](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Accontid] [int] NULL,
	[BeforeBalance] [decimal](18, 6) NULL,
	[AfterBalance] [decimal](18, 6) NULL,
	[CheckSum] [varchar](50) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AccountRelation]    Script Date: 1/27/2021 10:52:13 PM ******/
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
/****** Object:  Table [dbo].[AccountRole]    Script Date: 1/27/2021 10:52:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AccountRole](
	[AccountId] [int] NOT NULL,
	[RoleId] [int] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ActionType]    Script Date: 1/27/2021 10:52:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ActionType](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Des] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_ActionType] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Comment]    Script Date: 1/27/2021 10:52:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Comment](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[AccountId] [int] NOT NULL,
	[PostId] [int] NOT NULL,
	[Content] [nvarchar](max) NULL,
 CONSTRAINT [PK_Comment] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Conversation]    Script Date: 1/27/2021 10:52:14 PM ******/
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
	[Acount2Delete] [bit] NOT NULL,
 CONSTRAINT [PK_Conversation] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Image]    Script Date: 1/27/2021 10:52:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Image](
	[PostId] [int] NOT NULL,
	[Url] [nvarchar](max) NULL,
 CONSTRAINT [PK_Image] PRIMARY KEY CLUSTERED 
(
	[PostId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Info]    Script Date: 1/27/2021 10:52:14 PM ******/
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
	[SkinColor] [nvarchar](20) NULL,
 CONSTRAINT [PK_Info] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Like]    Script Date: 1/27/2021 10:52:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Like](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PostId] [int] NULL,
	[AcountLike] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MarkUpPost]    Script Date: 1/27/2021 10:52:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MarkUpPost](
	[PostId] [int] NOT NULL,
	[AccountId] [int] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Message]    Script Date: 1/27/2021 10:52:15 PM ******/
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
/****** Object:  Table [dbo].[Notification]    Script Date: 1/27/2021 10:52:15 PM ******/
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
/****** Object:  Table [dbo].[Post]    Script Date: 1/27/2021 10:52:15 PM ******/
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
 CONSTRAINT [PK_Post] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Privacy]    Script Date: 1/27/2021 10:52:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Privacy](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Des] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_Privacy] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Profile]    Script Date: 1/27/2021 10:52:16 PM ******/
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
	[Avatar] [nvarchar](max) NULL,
 CONSTRAINT [PK_Profile] PRIMARY KEY CLUSTERED 
(
	[AccountId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Rate]    Script Date: 1/27/2021 10:52:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Rate](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PostId] [int] NULL,
	[AcountRate] [int] NULL,
	[RatePoint] [int] NULL,
 CONSTRAINT [PK_Rate] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Reason]    Script Date: 1/27/2021 10:52:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Reason](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NULL,
	[Des] [nvarchar](max) NULL,
 CONSTRAINT [PK_Reason] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[RelationType]    Script Date: 1/27/2021 10:52:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RelationType](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Des] [nvarchar](max) NULL,
 CONSTRAINT [PK_RelationType] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Report]    Script Date: 1/27/2021 10:52:17 PM ******/
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
/****** Object:  Table [dbo].[ReportReason]    Script Date: 1/27/2021 10:52:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ReportReason](
	[ReportId] [int] NOT NULL,
	[ReasonId] [int] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ReportType]    Script Date: 1/27/2021 10:52:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ReportType](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NULL,
	[Des] [nvarchar](max) NULL,
 CONSTRAINT [PK_ReportType] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Role]    Script Date: 1/27/2021 10:52:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Role](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NULL,
	[Des] [nvarchar](max) NULL,
 CONSTRAINT [PK_Role] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Transactions]    Script Date: 1/27/2021 10:52:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Transactions](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NULL,
	[TransactionType] [int] NOT NULL,
	[Amount] [decimal](18, 6) NULL,
	[FromAccountId] [int] NOT NULL,
	[ToAccountId] [int] NOT NULL,
	[TransactionDate] [datetime] NULL,
	[CheckSum] [nchar](10) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TransactionType]    Script Date: 1/27/2021 10:52:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TransactionType](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Des] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_TransactionType] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TypeNotification]    Script Date: 1/27/2021 10:52:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TypeNotification](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NULL,
	[Des] [nvarchar](max) NULL,
 CONSTRAINT [PK_TypeNotification] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[Account] ADD  CONSTRAINT [DF_Account_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[Account] ADD  CONSTRAINT [DF_Account_IsBlock]  DEFAULT ((0)) FOR [IsBlock]
GO
USE [master]
GO
ALTER DATABASE [CapstonesNoRelation] SET  READ_WRITE 
GO
