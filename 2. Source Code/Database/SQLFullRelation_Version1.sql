USE [master]
GO
/****** Object:  Database [CapstoneNoneData]    Script Date: 24/04/2021 14:51:03 ******/
CREATE DATABASE [CapstoneNoneData]
 
GO
USE [CapstoneNoneData]
GO
/****** Object:  Table [dbo].[Account]    Script Date: 24/04/2021 14:51:03 ******/
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
	[DateCreated] [datetime] NULL,
 CONSTRAINT [PK_Account] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AccountLogs]    Script Date: 24/04/2021 14:51:03 ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AccountRelation]    Script Date: 24/04/2021 14:51:03 ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AccountRole]    Script Date: 24/04/2021 14:51:03 ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AccountVoucher]    Script Date: 24/04/2021 14:51:03 ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Comment]    Script Date: 24/04/2021 14:51:03 ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Conversation]    Script Date: 24/04/2021 14:51:03 ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Feedback]    Script Date: 24/04/2021 14:51:03 ******/
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
	[Status] [int] NOT NULL,
 CONSTRAINT [PK_Feedback] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Image]    Script Date: 24/04/2021 14:51:03 ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Info]    Script Date: 24/04/2021 14:51:03 ******/
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
	[name] [nvarchar](max) NULL,
 CONSTRAINT [PK_Info] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Like]    Script Date: 24/04/2021 14:51:03 ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MailContent]    Script Date: 24/04/2021 14:51:03 ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MarkUpPost]    Script Date: 24/04/2021 14:51:03 ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Message]    Script Date: 24/04/2021 14:51:03 ******/
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
	[Time] [datetime] NULL,
 CONSTRAINT [PK_Message] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MessageImage]    Script Date: 24/04/2021 14:51:03 ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Notification]    Script Date: 24/04/2021 14:51:03 ******/
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
	[DateCreated] [datetime] NULL,
 CONSTRAINT [PK_Notification] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[OTP]    Script Date: 24/04/2021 14:51:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OTP](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Code] [int] NOT NULL,
	[AccountID] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Post]    Script Date: 24/04/2021 14:51:03 ******/
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
	[IsVerified] [bit] NOT NULL,
	[Type] [int] NOT NULL,
 CONSTRAINT [PK_Post] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Privacy]    Script Date: 24/04/2021 14:51:03 ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Profile]    Script Date: 24/04/2021 14:51:03 ******/
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
	[IsFashionista] [bit] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Rate]    Script Date: 24/04/2021 14:51:03 ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Reason]    Script Date: 24/04/2021 14:51:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Reason](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NULL,
	[Description] [nvarchar](max) NULL,
	[ReportTypeID] [int] NOT NULL,
 CONSTRAINT [PK_Reason] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[RelationType]    Script Date: 24/04/2021 14:51:03 ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Report]    Script Date: 24/04/2021 14:51:03 ******/
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
	[IsProcessed] [bit] NOT NULL,
 CONSTRAINT [PK_Report] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ReportReason]    Script Date: 24/04/2021 14:51:03 ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ReportType]    Script Date: 24/04/2021 14:51:03 ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Role]    Script Date: 24/04/2021 14:51:03 ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SupportRequest]    Script Date: 24/04/2021 14:51:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SupportRequest](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[RequestType] [int] NOT NULL,
	[UserRequestId] [int] NOT NULL,
	[TimeCreate] [datetime] NOT NULL,
	[Status] [int] NOT NULL,
	[Respone] [nvarchar](max) NULL,
 CONSTRAINT [PK_SupportRequest] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SupportRequestType]    Script Date: 24/04/2021 14:51:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SupportRequestType](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Description] [nvarchar](500) NOT NULL,
 CONSTRAINT [PK_SupportRequestType] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Transactions]    Script Date: 24/04/2021 14:51:03 ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TransactionType]    Script Date: 24/04/2021 14:51:03 ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TypeAction]    Script Date: 24/04/2021 14:51:03 ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TypeNotification]    Script Date: 24/04/2021 14:51:03 ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Voucher]    Script Date: 24/04/2021 14:51:03 ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[MailContent] ON 

INSERT [dbo].[MailContent] ([ID], [Code], [Subject], [Content]) VALUES (1, N'SEND_MAIL_OTP', N'SOFA - MÃ XÁC THỰC', N'NU<b>Xin chào @lastname</b>
    <p>Chúng tôi nhận được yêu cầu cung cấp mã xác thực cho tài khoản SOFA của bạn</p>
    <p>Dưới đây là mã xác thực cho giao dịch. Mã xác thực sẽ hết hạn sau 60 giây. Để đảm bảo an toàn, vui lòng không cung cấp mã xác thực cho bất kỳ ai khác.</p>
    <p>Mã xác thực của bạn là: <b>@otp</b> </p>
    <p>Chúc bạn một ngày tốt lành</p>LL')
INSERT [dbo].[MailContent] ([ID], [Code], [Subject], [Content]) VALUES (2, N'NULLSEND_SMS_OTP', N'SOFA - Mã xác thực', N'Hello @lastname
This is your verification code: @otp
This code will expire after 60 seconds.
Please, never give this code to anyone.
Thanks.')
SET IDENTITY_INSERT [dbo].[MailContent] OFF
GO
SET IDENTITY_INSERT [dbo].[Privacy] ON 

INSERT [dbo].[Privacy] ([Id], [Name], [Description]) VALUES (1, N'Private', N'Chỉ người đăng bài có thể nhìn thấy bài viết này')
INSERT [dbo].[Privacy] ([Id], [Name], [Description]) VALUES (2, N'Only Friend', N'Chỉ những người theo dõi mới có thể nhìn thấy bài viết này')
INSERT [dbo].[Privacy] ([Id], [Name], [Description]) VALUES (3, N'Public', N'Tất cả mọi người đều có thể nhìn thấy bài viết này')
SET IDENTITY_INSERT [dbo].[Privacy] OFF
GO
SET IDENTITY_INSERT [dbo].[Reason] ON 

INSERT [dbo].[Reason] ([Id], [Name], [Description], [ReportTypeID]) VALUES (1, N'Nội dung không phù hợp', N'Nội dung không liên quan đến thời trang', 1)
INSERT [dbo].[Reason] ([Id], [Name], [Description], [ReportTypeID]) VALUES (2, N'Ảnh khỏa thân', N'Nội dung khỏa thân', 1)
INSERT [dbo].[Reason] ([Id], [Name], [Description], [ReportTypeID]) VALUES (3, N'Bạo lực', N'Nội dung bạo lực', 1)
INSERT [dbo].[Reason] ([Id], [Name], [Description], [ReportTypeID]) VALUES (4, N'Quấy rối', N'Có hành vi quấy rối người khác', 1)
INSERT [dbo].[Reason] ([Id], [Name], [Description], [ReportTypeID]) VALUES (5, N'Gây thương tích', N'Gây thương tích cho người hoặc động vật', 1)
INSERT [dbo].[Reason] ([Id], [Name], [Description], [ReportTypeID]) VALUES (6, N'Thông tin sai sự thật', N'Chứa thông tin không đúng sự thật', 1)
INSERT [dbo].[Reason] ([Id], [Name], [Description], [ReportTypeID]) VALUES (7, N'Bán hàng trái phép', N'Bài viết bán hàng không đúng quy định', 1)
INSERT [dbo].[Reason] ([Id], [Name], [Description], [ReportTypeID]) VALUES (8, N'Khủng bố', N'Ngôn ngữ gây thù địch, có nội dung khủng bố', 1)
INSERT [dbo].[Reason] ([Id], [Name], [Description], [ReportTypeID]) VALUES (9, N'Giả mạo người khác', N'Tài khoản này giả mạo người khác', 2)
INSERT [dbo].[Reason] ([Id], [Name], [Description], [ReportTypeID]) VALUES (10, N'Đăng nội dung không phù hợp', N'Tài khoản này đăng nội dung không đúng quy định', 2)
SET IDENTITY_INSERT [dbo].[Reason] OFF
GO
SET IDENTITY_INSERT [dbo].[RelationType] ON 

INSERT [dbo].[RelationType] ([Id], [Name], [Description]) VALUES (1, N'Follow', N'NUFollow someoneLL')
INSERT [dbo].[RelationType] ([Id], [Name], [Description]) VALUES (2, N'Block', N'Block someone')
SET IDENTITY_INSERT [dbo].[RelationType] OFF
GO
SET IDENTITY_INSERT [dbo].[ReportType] ON 

INSERT [dbo].[ReportType] ([Id], [Name], [Description]) VALUES (1, N'Post', N'Report đối với bài đăng')
INSERT [dbo].[ReportType] ([Id], [Name], [Description]) VALUES (2, N'User', N'Report đối với người dùng')
INSERT [dbo].[ReportType] ([Id], [Name], [Description]) VALUES (3, N'Comment', N'Report đối với bình luận')
SET IDENTITY_INSERT [dbo].[ReportType] OFF
GO
SET IDENTITY_INSERT [dbo].[Role] ON 

INSERT [dbo].[Role] ([Id], [Name], [Descriptioncription]) VALUES (1, N'Admin', N'Administrator')
INSERT [dbo].[Role] ([Id], [Name], [Descriptioncription]) VALUES (2, N'User', N'User')
SET IDENTITY_INSERT [dbo].[Role] OFF
GO
SET IDENTITY_INSERT [dbo].[SupportRequestType] ON 

INSERT [dbo].[SupportRequestType] ([Id], [Name], [Description]) VALUES (1, N'Fashionista', N'When someone wants to become a fashionista')
INSERT [dbo].[SupportRequestType] ([Id], [Name], [Description]) VALUES (2, N'Block account', N'When someone wants block his/her account for a time')
SET IDENTITY_INSERT [dbo].[SupportRequestType] OFF
GO
INSERT [dbo].[TransactionType] ([Id], [Name], [Description]) VALUES (1, N'TopUp Account ', N'TopUp Account ')
GO
SET IDENTITY_INSERT [dbo].[TypeNotification] ON 

INSERT [dbo].[TypeNotification] ([Id], [Name], [Description]) VALUES (1, N'Like', N'Like post')
INSERT [dbo].[TypeNotification] ([Id], [Name], [Description]) VALUES (2, N'Comment', N'Comment post')
INSERT [dbo].[TypeNotification] ([Id], [Name], [Description]) VALUES (3, N'Rate', N'Rate post')
INSERT [dbo].[TypeNotification] ([Id], [Name], [Description]) VALUES (4, N'Follow', N'Follow post')
INSERT [dbo].[TypeNotification] ([Id], [Name], [Description]) VALUES (5, N'Invalid image', N'Invalid image posted from user')
INSERT [dbo].[TypeNotification] ([Id], [Name], [Description]) VALUES (6, N'Feedback', N'Feedback from user')
INSERT [dbo].[TypeNotification] ([Id], [Name], [Description]) VALUES (7, N'Approve support', N'Approve support requested from user')
INSERT [dbo].[TypeNotification] ([Id], [Name], [Description]) VALUES (8, N'Reject support', N'Reject support requested from user')
INSERT [dbo].[TypeNotification] ([Id], [Name], [Description]) VALUES (9, N'Topup account', N'Topup account')
SET IDENTITY_INSERT [dbo].[TypeNotification] OFF
GO
ALTER TABLE [dbo].[Account] ADD  CONSTRAINT [DF_Account_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[Account] ADD  CONSTRAINT [DF_Account_IsBlock]  DEFAULT ((0)) FOR [IsBlock]
GO
ALTER TABLE [dbo].[Comment] ADD  DEFAULT (getdate()) FOR [Time]
GO
ALTER TABLE [dbo].[Post] ADD  CONSTRAINT [DF_Post_IsVerified]  DEFAULT ((0)) FOR [IsVerified]
GO
ALTER TABLE [dbo].[Post] ADD  CONSTRAINT [DF_Post_Type]  DEFAULT ((0)) FOR [Type]
GO
ALTER TABLE [dbo].[Reason] ADD  CONSTRAINT [DF_Reason_ReportTypeID]  DEFAULT ((1)) FOR [ReportTypeID]
GO
ALTER TABLE [dbo].[Report] ADD  CONSTRAINT [DF_Report_IsProcessed]  DEFAULT ((0)) FOR [IsProcessed]
GO
ALTER TABLE [dbo].[AccountLogs]  WITH CHECK ADD  CONSTRAINT [FK_AccountLogs_AccountVoucher] FOREIGN KEY([AccountID])
REFERENCES [dbo].[AccountVoucher] ([Id])
GO
ALTER TABLE [dbo].[AccountLogs] CHECK CONSTRAINT [FK_AccountLogs_AccountVoucher]
GO
ALTER TABLE [dbo].[AccountLogs]  WITH CHECK ADD  CONSTRAINT [FK_AccountLogs_Transactions] FOREIGN KEY([TransactionId])
REFERENCES [dbo].[Transactions] ([Id])
GO
ALTER TABLE [dbo].[AccountLogs] CHECK CONSTRAINT [FK_AccountLogs_Transactions]
GO
ALTER TABLE [dbo].[AccountRelation]  WITH CHECK ADD  CONSTRAINT [FK_AccountRelation_Account] FOREIGN KEY([AccountId1])
REFERENCES [dbo].[Account] ([Id])
GO
ALTER TABLE [dbo].[AccountRelation] CHECK CONSTRAINT [FK_AccountRelation_Account]
GO
ALTER TABLE [dbo].[AccountRelation]  WITH CHECK ADD  CONSTRAINT [FK_AccountRelation_Account1] FOREIGN KEY([AccountId2])
REFERENCES [dbo].[Account] ([Id])
GO
ALTER TABLE [dbo].[AccountRelation] CHECK CONSTRAINT [FK_AccountRelation_Account1]
GO
ALTER TABLE [dbo].[AccountRelation]  WITH CHECK ADD  CONSTRAINT [FK_AccountRelation_RelationType] FOREIGN KEY([RelationType])
REFERENCES [dbo].[RelationType] ([Id])
GO
ALTER TABLE [dbo].[AccountRelation] CHECK CONSTRAINT [FK_AccountRelation_RelationType]
GO
ALTER TABLE [dbo].[AccountRole]  WITH CHECK ADD  CONSTRAINT [FK_AccountRole_Account] FOREIGN KEY([AccountId])
REFERENCES [dbo].[Account] ([Id])
GO
ALTER TABLE [dbo].[AccountRole] CHECK CONSTRAINT [FK_AccountRole_Account]
GO
ALTER TABLE [dbo].[AccountRole]  WITH CHECK ADD  CONSTRAINT [FK_AccountRole_Role] FOREIGN KEY([RoleId])
REFERENCES [dbo].[Role] ([Id])
GO
ALTER TABLE [dbo].[AccountRole] CHECK CONSTRAINT [FK_AccountRole_Role]
GO
ALTER TABLE [dbo].[AccountVoucher]  WITH CHECK ADD  CONSTRAINT [FK_AccountVoucher_Account] FOREIGN KEY([AccountId])
REFERENCES [dbo].[Account] ([Id])
GO
ALTER TABLE [dbo].[AccountVoucher] CHECK CONSTRAINT [FK_AccountVoucher_Account]
GO
ALTER TABLE [dbo].[AccountVoucher]  WITH CHECK ADD  CONSTRAINT [FK_AccountVoucher_Voucher] FOREIGN KEY([VoucherId])
REFERENCES [dbo].[Voucher] ([Id])
GO
ALTER TABLE [dbo].[AccountVoucher] CHECK CONSTRAINT [FK_AccountVoucher_Voucher]
GO
ALTER TABLE [dbo].[Comment]  WITH CHECK ADD  CONSTRAINT [FK_Comment_Account] FOREIGN KEY([AccountId])
REFERENCES [dbo].[Account] ([Id])
GO
ALTER TABLE [dbo].[Comment] CHECK CONSTRAINT [FK_Comment_Account]
GO
ALTER TABLE [dbo].[Comment]  WITH CHECK ADD  CONSTRAINT [FK_Comment_Post] FOREIGN KEY([PostId])
REFERENCES [dbo].[Post] ([Id])
GO
ALTER TABLE [dbo].[Comment] CHECK CONSTRAINT [FK_Comment_Post]
GO
ALTER TABLE [dbo].[Conversation]  WITH CHECK ADD  CONSTRAINT [FK_Conversation_Account] FOREIGN KEY([AccountId1])
REFERENCES [dbo].[Account] ([Id])
GO
ALTER TABLE [dbo].[Conversation] CHECK CONSTRAINT [FK_Conversation_Account]
GO
ALTER TABLE [dbo].[Conversation]  WITH CHECK ADD  CONSTRAINT [FK_Conversation_Account1] FOREIGN KEY([AccountId2])
REFERENCES [dbo].[Account] ([Id])
GO
ALTER TABLE [dbo].[Conversation] CHECK CONSTRAINT [FK_Conversation_Account1]
GO
ALTER TABLE [dbo].[Feedback]  WITH CHECK ADD  CONSTRAINT [FK_Feedback_Account] FOREIGN KEY([UserFeedbackId])
REFERENCES [dbo].[Account] ([Id])
GO
ALTER TABLE [dbo].[Feedback] CHECK CONSTRAINT [FK_Feedback_Account]
GO
ALTER TABLE [dbo].[Image]  WITH CHECK ADD  CONSTRAINT [FK_Image_Post] FOREIGN KEY([PostId])
REFERENCES [dbo].[Post] ([Id])
GO
ALTER TABLE [dbo].[Image] CHECK CONSTRAINT [FK_Image_Post]
GO
ALTER TABLE [dbo].[Info]  WITH CHECK ADD  CONSTRAINT [FK_Info_Account] FOREIGN KEY([AccountId])
REFERENCES [dbo].[Account] ([Id])
GO
ALTER TABLE [dbo].[Info] CHECK CONSTRAINT [FK_Info_Account]
GO
ALTER TABLE [dbo].[Like]  WITH CHECK ADD  CONSTRAINT [FK_Like_Account] FOREIGN KEY([AccountLike])
REFERENCES [dbo].[Account] ([Id])
GO
ALTER TABLE [dbo].[Like] CHECK CONSTRAINT [FK_Like_Account]
GO
ALTER TABLE [dbo].[Like]  WITH CHECK ADD  CONSTRAINT [FK_Like_Post] FOREIGN KEY([PostId])
REFERENCES [dbo].[Post] ([Id])
GO
ALTER TABLE [dbo].[Like] CHECK CONSTRAINT [FK_Like_Post]
GO
ALTER TABLE [dbo].[MarkUpPost]  WITH CHECK ADD  CONSTRAINT [FK_MarkUpPost_Account] FOREIGN KEY([AccountId])
REFERENCES [dbo].[Account] ([Id])
GO
ALTER TABLE [dbo].[MarkUpPost] CHECK CONSTRAINT [FK_MarkUpPost_Account]
GO
ALTER TABLE [dbo].[MarkUpPost]  WITH CHECK ADD  CONSTRAINT [FK_MarkUpPost_Post] FOREIGN KEY([PostId])
REFERENCES [dbo].[Post] ([Id])
GO
ALTER TABLE [dbo].[MarkUpPost] CHECK CONSTRAINT [FK_MarkUpPost_Post]
GO
ALTER TABLE [dbo].[Message]  WITH CHECK ADD  CONSTRAINT [FK_Message_Account] FOREIGN KEY([FromAccountId])
REFERENCES [dbo].[Account] ([Id])
GO
ALTER TABLE [dbo].[Message] CHECK CONSTRAINT [FK_Message_Account]
GO
ALTER TABLE [dbo].[Message]  WITH CHECK ADD  CONSTRAINT [FK_Message_Account1] FOREIGN KEY([ToAccountId])
REFERENCES [dbo].[Account] ([Id])
GO
ALTER TABLE [dbo].[Message] CHECK CONSTRAINT [FK_Message_Account1]
GO
ALTER TABLE [dbo].[Message]  WITH CHECK ADD  CONSTRAINT [FK_Message_Conversation] FOREIGN KEY([ConversationId])
REFERENCES [dbo].[Conversation] ([Id])
GO
ALTER TABLE [dbo].[Message] CHECK CONSTRAINT [FK_Message_Conversation]
GO
ALTER TABLE [dbo].[MessageImage]  WITH CHECK ADD  CONSTRAINT [FK_MessageImage_Message] FOREIGN KEY([MessageId])
REFERENCES [dbo].[Message] ([Id])
GO
ALTER TABLE [dbo].[MessageImage] CHECK CONSTRAINT [FK_MessageImage_Message]
GO
ALTER TABLE [dbo].[Notification]  WITH CHECK ADD  CONSTRAINT [FK_Notification_Account] FOREIGN KEY([FromAccount])
REFERENCES [dbo].[Account] ([Id])
GO
ALTER TABLE [dbo].[Notification] CHECK CONSTRAINT [FK_Notification_Account]
GO
ALTER TABLE [dbo].[Notification]  WITH CHECK ADD  CONSTRAINT [FK_Notification_Account1] FOREIGN KEY([ToAccount])
REFERENCES [dbo].[Account] ([Id])
GO
ALTER TABLE [dbo].[Notification] CHECK CONSTRAINT [FK_Notification_Account1]
GO
ALTER TABLE [dbo].[Notification]  WITH CHECK ADD  CONSTRAINT [FK_Notification_TypeAction] FOREIGN KEY([TypeAction])
REFERENCES [dbo].[TypeAction] ([Id])
GO
ALTER TABLE [dbo].[Notification] CHECK CONSTRAINT [FK_Notification_TypeAction]
GO
ALTER TABLE [dbo].[Notification]  WITH CHECK ADD  CONSTRAINT [FK_Notification_TypeNotification] FOREIGN KEY([TypeNotification])
REFERENCES [dbo].[TypeNotification] ([Id])
GO
ALTER TABLE [dbo].[Notification] CHECK CONSTRAINT [FK_Notification_TypeNotification]
GO
ALTER TABLE [dbo].[OTP]  WITH CHECK ADD  CONSTRAINT [FK_OTP_Account] FOREIGN KEY([AccountID])
REFERENCES [dbo].[Account] ([Id])
GO
ALTER TABLE [dbo].[OTP] CHECK CONSTRAINT [FK_OTP_Account]
GO
ALTER TABLE [dbo].[Post]  WITH CHECK ADD  CONSTRAINT [FK_Post_Account] FOREIGN KEY([AccountPost])
REFERENCES [dbo].[Account] ([Id])
GO
ALTER TABLE [dbo].[Post] CHECK CONSTRAINT [FK_Post_Account]
GO
ALTER TABLE [dbo].[Post]  WITH CHECK ADD  CONSTRAINT [FK_Post_Privacy] FOREIGN KEY([PrivacyID])
REFERENCES [dbo].[Privacy] ([Id])
GO
ALTER TABLE [dbo].[Post] CHECK CONSTRAINT [FK_Post_Privacy]
GO
ALTER TABLE [dbo].[Profile]  WITH CHECK ADD  CONSTRAINT [FK_Profile_Account] FOREIGN KEY([AccountId])
REFERENCES [dbo].[Account] ([Id])
GO
ALTER TABLE [dbo].[Profile] CHECK CONSTRAINT [FK_Profile_Account]
GO
ALTER TABLE [dbo].[Rate]  WITH CHECK ADD  CONSTRAINT [FK_Rate_Account] FOREIGN KEY([AccountRate])
REFERENCES [dbo].[Account] ([Id])
GO
ALTER TABLE [dbo].[Rate] CHECK CONSTRAINT [FK_Rate_Account]
GO
ALTER TABLE [dbo].[Rate]  WITH CHECK ADD  CONSTRAINT [FK_Rate_Post] FOREIGN KEY([PostId])
REFERENCES [dbo].[Post] ([Id])
GO
ALTER TABLE [dbo].[Rate] CHECK CONSTRAINT [FK_Rate_Post]
GO
ALTER TABLE [dbo].[Report]  WITH CHECK ADD  CONSTRAINT [FK_Report_Account] FOREIGN KEY([ToAccount])
REFERENCES [dbo].[Account] ([Id])
GO
ALTER TABLE [dbo].[Report] CHECK CONSTRAINT [FK_Report_Account]
GO
ALTER TABLE [dbo].[Report]  WITH CHECK ADD  CONSTRAINT [FK_Report_ReportType] FOREIGN KEY([TypeReport])
REFERENCES [dbo].[ReportType] ([Id])
GO
ALTER TABLE [dbo].[Report] CHECK CONSTRAINT [FK_Report_ReportType]
GO
ALTER TABLE [dbo].[ReportReason]  WITH CHECK ADD  CONSTRAINT [FK_ReportReason_Reason] FOREIGN KEY([ReasonId])
REFERENCES [dbo].[Reason] ([Id])
GO
ALTER TABLE [dbo].[ReportReason] CHECK CONSTRAINT [FK_ReportReason_Reason]
GO
ALTER TABLE [dbo].[ReportReason]  WITH CHECK ADD  CONSTRAINT [FK_ReportReason_Report] FOREIGN KEY([ReportId])
REFERENCES [dbo].[Report] ([Id])
GO
ALTER TABLE [dbo].[ReportReason] CHECK CONSTRAINT [FK_ReportReason_Report]
GO
ALTER TABLE [dbo].[SupportRequest]  WITH CHECK ADD  CONSTRAINT [FK_SupportRequest_Account] FOREIGN KEY([UserRequestId])
REFERENCES [dbo].[Account] ([Id])
GO
ALTER TABLE [dbo].[SupportRequest] CHECK CONSTRAINT [FK_SupportRequest_Account]
GO
ALTER TABLE [dbo].[SupportRequest]  WITH CHECK ADD  CONSTRAINT [FK_SupportRequest_SupportRequestType] FOREIGN KEY([RequestType])
REFERENCES [dbo].[SupportRequestType] ([Id])
GO
ALTER TABLE [dbo].[SupportRequest] CHECK CONSTRAINT [FK_SupportRequest_SupportRequestType]
GO
ALTER TABLE [dbo].[Transactions]  WITH CHECK ADD  CONSTRAINT [FK_Transactions_TransactionType] FOREIGN KEY([Type])
REFERENCES [dbo].[TransactionType] ([Id])
GO
ALTER TABLE [dbo].[Transactions] CHECK CONSTRAINT [FK_Transactions_TransactionType]
GO
/****** Object:  StoredProcedure [dbo].[AddImagePost]    Script Date: 24/04/2021 14:51:04 ******/
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
/****** Object:  StoredProcedure [dbo].[AddMailContent]    Script Date: 24/04/2021 14:51:04 ******/
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
/****** Object:  StoredProcedure [dbo].[AddMarkupPost]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[AddMarkupPost]
@postID INT, @accountID INT
AS
BEGIN
	DECLARE @markupID INT
	SET @markupID = (SELECT Id FROM dbo.MarkUpPost WHERE PostId = @postID AND AccountId = @accountID)
	IF @markupID IS NULL
	BEGIN
		INSERT INTO MarkupPost(PostID, AccountID)
		OUTPUT Inserted.*
		VALUES(@postID, @accountID)
	END
	ELSE
	BEGIN
		SELECT 0 AS ID, 0 AS PostID, 0 AS AccountID
	END
END
GO
/****** Object:  StoredProcedure [dbo].[AddNewAccount]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[AddNewAccount] @Username nvarchar(50), @Password nvarchar(MAX), @FirstName nvarchar(50), @LastName nvarchar(50) , @Email nvarchar(MAX), @Phone nvarchar(50), @RoleId int, @DateCreated datetime
AS
	INSERT INTO Account values(@Username, @Password, 1, 0, @DateCreated)
	DECLARE @AccountID  AS int 
	SET @AccountID = SCOPE_IDENTITY()
	INSERT INTO Profile(AccountId, FirstName, LastName, Email, Phone) VALUES(@AccountID, @FirstName, @LastName, @Email, @Phone)
	INSERT INTO AccountRole(AccountId, RoleId) values(@AccountID, @RoleId)
GO
/****** Object:  StoredProcedure [dbo].[AddNewImage]    Script Date: 24/04/2021 14:51:04 ******/
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
/****** Object:  StoredProcedure [dbo].[AddNewMessage]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[AddNewMessage]
(@FromAccountId int, @ToAccountId int, @Content nvarchar(max), @SenderDeleted bit, @ReceiverDeleted bit, @IsRead bit, @ConversationId int, @Time datetime)
AS
BEGIN
INSERT INTO [dbo].[Message]
           ([FromAccountId]
           ,[ToAccountId]
           ,[Content]
           ,[SenderDeleted]
           ,[ReceiverDeleted]
           ,[IsRead]
           ,[ConversationId]
           ,[Time])
		   OUTPUT inserted.*
     VALUES
           (@FromAccountId
           ,@ToAccountId
           ,@Content
           ,@SenderDeleted
           ,@ReceiverDeleted 
           ,@IsRead
           ,@ConversationId
           ,@Time)
END
GO
/****** Object:  StoredProcedure [dbo].[AddNewMessageImage]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[AddNewMessageImage]
(@time nvarchar(max), @Url nvarchar(max))
AS
BEGIN
INSERT INTO [dbo].[MessageImage]
           ([MessageId]
           ,[Url])
		   OUTPUT inserted.*
     VALUES
           ((select Id from Message where Time = @time)
           ,@Url)
END 
GO
/****** Object:  StoredProcedure [dbo].[AddNewNotification]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[AddNewNotification] @TypeNotification int, @PostId int, @Content nvarchar(MAX), @FromAccount int, @ToAccount int, @DateCreated datetime
AS
INSERT INTO [Notification](TypeNotification, IsRead, PostId, Content, FromAccount, ToAccount, DateCreated ) 
values(@TypeNotification, 0, @PostId, @Content, @FromAccount, @ToAccount, @DateCreated)
GO
/****** Object:  StoredProcedure [dbo].[AddNewNotificationFeedback]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[AddNewNotificationFeedback] @TypeNotification int, @Content nvarchar(MAX), @FromAccount int, @ToAccount int, @DateCreated datetime
AS
INSERT INTO [Notification](TypeNotification, IsRead, Content, FromAccount, ToAccount, DateCreated ) 
values(@TypeNotification, 0, @Content, @FromAccount, @ToAccount, @DateCreated)
GO
/****** Object:  StoredProcedure [dbo].[AddNewPost]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[AddNewPost]
@content NVARCHAR(MAX), @privacyID INT, @accountPost INT, @bodyInfoID INT, @isVerified BIT, @type INT
AS
BEGIN
	INSERT INTO dbo.Post
	(
	    Content,
	    PrivacyID,
	    Time,
	    AccountPost,
		BodyInfoID,
		IsVerified,
		Type
	)
	OUTPUT Inserted.*
	VALUES
	(   @content,       -- Content - nvarchar(max)
	    @privacyID,         -- PrivacyID - int
	    GETDATE(), -- Time - datetime
	    @accountPost ,         -- AccountPost - int
		@bodyInfoID,
		@isVerified,
		@type
	    )
END
GO
/****** Object:  StoredProcedure [dbo].[AddNewStaff]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create PROCEDURE [dbo].[AddNewStaff] @Username nvarchar(50), @Password nvarchar(MAX),  @FirstName nvarchar(50), @LastName nvarchar(50), @RoleId int, @DateCreated datetime
AS
	INSERT INTO Account values(@Username, @Password, 1, 0, @DateCreated)
	DECLARE @AccountID  AS int 
	SET @AccountID = SCOPE_IDENTITY()
	INSERT INTO Profile(AccountId, FirstName, LastName) VALUES(@AccountID, @FirstName, @LastName)
	INSERT INTO AccountRole(AccountId, RoleId) values(@AccountID, @RoleId)
GO
/****** Object:  StoredProcedure [dbo].[AddOTP]    Script Date: 24/04/2021 14:51:04 ******/
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
/****** Object:  StoredProcedure [dbo].[AddReason]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[AddReason]
@name NVARCHAR(MAX), @des NVARCHAR(MAX), @reportTypeID INT
AS
BEGIN
	INSERT dbo.Reason
	(
	    Name,
	    Description,
		ReportTypeID
	)
	OUTPUT Inserted.*
	VALUES
	(   @name, -- Name - nvarchar(50)
	    @des,  -- Description - nvarchar(max)
		@reportTypeID
	    )
END
GO
/****** Object:  StoredProcedure [dbo].[AddReasonForReport]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[AddReasonForReport]
@reportID INT, @reasonID INT
AS
BEGIN
	INSERT dbo.ReportReason
	(
	    ReportId,
	    ReasonId
	)
	OUTPUT Inserted.*
	VALUES
	(   @reportID, -- ReportId - int
	    @reasonID  -- ReasonId - int
	    )
END
GO
/****** Object:  StoredProcedure [dbo].[AddReportType]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[AddReportType]
@name NVARCHAR(MAX), @des NVARCHAR(MAX)
AS
BEGIN
	INSERT dbo.ReportType
	(
	    Name,
	    Description
	)
	OUTPUT Inserted.*
	VALUES
	(   @name, -- Name - nvarchar(50)
	    @des  -- Description - nvarchar(max)
	    )
END
GO
/****** Object:  StoredProcedure [dbo].[AddVoucher]    Script Date: 24/04/2021 14:51:04 ******/
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
/****** Object:  StoredProcedure [dbo].[BanUser]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[BanUser]
@AccountId INT
AS
BEGIN
	UPDATE Account
	SET IsActive = 0
	WHERE Id = @AccountId;
END
GO
/****** Object:  StoredProcedure [dbo].[CheckFollowed]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[CheckFollowed]
(@followerId int, @userGetFollowId int)
AS
BEGIN
SELECT * FROM AccountRelation 
WHERE AccountId1 = @followerId AND AccountId2 = @userGetFollowId AND RelationType = 1
END
GO
/****** Object:  StoredProcedure [dbo].[CountCommentOfPost]    Script Date: 24/04/2021 14:51:04 ******/
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
/****** Object:  StoredProcedure [dbo].[CountLikeOfPost]    Script Date: 24/04/2021 14:51:04 ******/
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
/****** Object:  StoredProcedure [dbo].[CountPublicPostOfUser]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[CountPublicPostOfUser]
@accountID INT
AS
BEGIN
	SELECT COUNT(*) FROM dbo.Post WHERE AccountPost = @accountID AND PrivacyID = 3
END
GO
/****** Object:  StoredProcedure [dbo].[CrateRate]    Script Date: 24/04/2021 14:51:04 ******/
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
/****** Object:  StoredProcedure [dbo].[CreateComment]    Script Date: 24/04/2021 14:51:04 ******/
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
/****** Object:  StoredProcedure [dbo].[CreateInfo]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[CreateInfo]
@accountID INT, @height FLOAT, @weight FLOAT, @bustSize FLOAT, @waistSize FLOAT, @hipSize FLOAT, @skinColor INT, @name NVARCHAR(MAX)
AS
BEGIN
	INSERT INTO Info(AccountId, height, [weight], BustSize, WaistSize, HipSize, SkinColor, [Name])
	OUTPUT inserted.*
	VALUES(@accountID, @height, @weight, @bustSize, @waistSize, @hipSize, @skinColor, @name)
END
GO
/****** Object:  StoredProcedure [dbo].[CreateNewConversation]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE Proc [dbo].[CreateNewConversation]
(@TimeCreate datetime, @TimeUpdate datetime, @AccountId1 int, @AccountId2 int, @Account1Delete bit, @Account2Delete bit)
AS
BEGIN
INSERT INTO [dbo].[Conversation]
           ([TimeCreate]
           ,[TimeUpdate]
           ,[AccountId1]
           ,[AccountId2]
           ,[Account1Delete]
           ,[Account2Delete])
		   OUTPUT inserted.*
     VALUES
           (@TimeCreate
           ,@TimeUpdate
           ,@AccountId1
           ,@AccountId2
           ,@Account1Delete
           ,@Account2Delete)
END


GO
/****** Object:  StoredProcedure [dbo].[CreateNewFeedback]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[CreateNewFeedback]
(@title nvarchar(max), @content nvarchar(max), @userFeedbackId int, @lastUpdated datetime, @status int)
AS
BEGIN
INSERT INTO [dbo].[Feedback]
           ([Title]
           ,[Content]
           ,[UserFeedbackId]
		   ,[LastUpdated]
           ,[Status])
		   OUTPUT inserted.*
     VALUES
           (@title
           ,@content
           ,@userFeedbackId
		   ,@lastUpdated
           ,@status)
END

GO
/****** Object:  StoredProcedure [dbo].[CreateNewSupportRequest]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[CreateNewSupportRequest]
(@requestType int, @userRequestId int, @timeCreate datetime, @status int, @respone nvarchar(max))
AS
BEGIN
INSERT INTO [dbo].[SupportRequest]
           ([RequestType]
           ,[UserRequestId]
           ,[TimeCreate]
           ,[Status]
           ,[Respone])
		   OUTPUT inserted.*
     VALUES
           (@requestType
           ,@userRequestId
           ,@timeCreate
           ,@status
           ,@respone)
END
GO
/****** Object:  StoredProcedure [dbo].[CreateRate]    Script Date: 24/04/2021 14:51:04 ******/
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
/****** Object:  StoredProcedure [dbo].[CreateReport]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[CreateReport]
@fromAccount INT, @toAccount INT, @toPost INT, @toComment INT, @typeReport INT, @reportContent NVARCHAR(MAX)
AS
BEGIN
	INSERT dbo.Report
	(
	    FromAccount,
	    ToAccount,
	    ToPost,
	    ToComment,
	    TypeReport,
	    ReportContent
	)
	OUTPUT Inserted.*
	VALUES
	(   @fromAccount,  -- FromAccount - int
	    @toAccount,  -- ToAccount - int
	    @toPost,  -- ToPost - int
	    @toComment,  -- ToComment - int
	    @typeReport,  -- TypeReport - int
	    @reportContent -- ReportContent - nvarchar(max)
	    )
END
GO
/****** Object:  StoredProcedure [dbo].[DeleteAllImagesPostByPostID]    Script Date: 24/04/2021 14:51:04 ******/
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
/****** Object:  StoredProcedure [dbo].[DeleteComment]    Script Date: 24/04/2021 14:51:04 ******/
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
/****** Object:  StoredProcedure [dbo].[DeleteCoversation]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create PROCEDURE [dbo].[DeleteCoversation]
@AccountID int,
@ChatWithAccountId int
AS
BEGIN
UPDATE Message 
	SET SenderDeleted = case when (FromAccountId =@AccountID and ToAccountId = @ChatWithAccountId and SenderDeleted=0 )  then '1' else SenderDeleted end,
	ReceiverDeleted= case when (FromAccountId =@ChatWithAccountId and ToAccountId = @AccountID and ReceiverDeleted=0 )  then '1' else ReceiverDeleted end
 where (FromAccountId =@AccountID and ToAccountId =@ChatWithAccountId) or ( FromAccountId =@ChatWithAccountId and ToAccountId =@AccountID)
 End
GO
/****** Object:  StoredProcedure [dbo].[DeleteImagePostByImageID]    Script Date: 24/04/2021 14:51:04 ******/
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
/****** Object:  StoredProcedure [dbo].[DeleteInfoByID]    Script Date: 24/04/2021 14:51:04 ******/
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
/****** Object:  StoredProcedure [dbo].[DeleteInfoOfUser]    Script Date: 24/04/2021 14:51:04 ******/
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
/****** Object:  StoredProcedure [dbo].[DeleteMailContentByCode]    Script Date: 24/04/2021 14:51:04 ******/
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
/****** Object:  StoredProcedure [dbo].[DeleteMailContentByID]    Script Date: 24/04/2021 14:51:04 ******/
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
/****** Object:  StoredProcedure [dbo].[DeleteMarkupPost]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[DeleteMarkupPost]
@postID INT, @accountID INT
AS
BEGIN
	DELETE FROM MarkupPost WHERE PostID = @postID AND AccountID = @accountID
END
GO
/****** Object:  StoredProcedure [dbo].[DeleteOTP]    Script Date: 24/04/2021 14:51:04 ******/
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
/****** Object:  StoredProcedure [dbo].[DeletePost]    Script Date: 24/04/2021 14:51:04 ******/
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
/****** Object:  StoredProcedure [dbo].[DeleteReasonByID]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[DeleteReasonByID]
@reasonID INT
AS
BEGIN
	DELETE FROM dbo.Reason WHERE Id = @reasonID
END
GO
/****** Object:  StoredProcedure [dbo].[DeleteTypeReportByID]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[DeleteTypeReportByID]
@typeID INT
AS
BEGIN
	DELETE FROM dbo.ReportType WHERE Id = @typeID
END
GO
/****** Object:  StoredProcedure [dbo].[DeleteVoucher]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[DeleteVoucher]
@VoucherId INT
AS
BEGIN
    DELETE FROM dbo.Voucher 
	WHERE Id = @VoucherId
END
GO
/****** Object:  StoredProcedure [dbo].[FollowUser]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[FollowUser]
(@followerId int, @userGetFollowId int)
AS
BEGIN
INSERT INTO [dbo].[AccountRelation]
           ([AccountId1]
           ,[AccountId2]
           ,[RelationType])
		   OUTPUT inserted.*
     VALUES
           (@followerId
           ,@userGetFollowId
           ,1)
END
GO
/****** Object:  StoredProcedure [dbo].[GetAllCommentOfPost]    Script Date: 24/04/2021 14:51:04 ******/
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
	ORDER BY [Time] DESC
	OFFSET (@page-1)*@rowsOfPage ROWS
	FETCH NEXT @rowsOfPage ROWS ONLY
END
GO
/****** Object:  StoredProcedure [dbo].[GetAllCommentOfPostWithoutPaging]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[GetAllCommentOfPostWithoutPaging]
@postID INT
AS
BEGIN
    SELECT * FROM dbo.Comment 
	WHERE PostId = @postID
	ORDER BY [Time] ASC
END
GO
/****** Object:  StoredProcedure [dbo].[GetAllInfo]    Script Date: 24/04/2021 14:51:04 ******/
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
/****** Object:  StoredProcedure [dbo].[GetAllLikeOfPost]    Script Date: 24/04/2021 14:51:04 ******/
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
/****** Object:  StoredProcedure [dbo].[GetAllMarkupPost]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[GetAllMarkupPost]
@page INT, @rowsOfPage INT
AS
BEGIN
	SELECT Post.* FROM MarkupPost
	INNER JOIN Post ON Post.Id = MarkupPost.PostID
	ORDER BY MarkupPost.id ASC
	OFFSET (@page-1)*@rowsOfPage ROWS
	FETCH NEXT @rowsOfPage ROWS ONLY
END
GO
/****** Object:  StoredProcedure [dbo].[GetAllPostOfUser]    Script Date: 24/04/2021 14:51:04 ******/
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
/****** Object:  StoredProcedure [dbo].[GetAllPostWithoutPaging]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create PROCEDURE [dbo].[GetAllPostWithoutPaging]
AS
	SELECT *
	FROM Post p
	ORDER BY p.Time DESC
GO
/****** Object:  StoredProcedure [dbo].[GetAllPublicPost]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[GetAllPublicPost]
@page INT, @rowsOfPage INT
AS
BEGIN
	SELECT * FROM dbo.Post
	WHERE PrivacyID = (SELECT ID FROM Privacy WHERE Name = 'Public') AND IsVerified = 1
	ORDER BY [Time] DESC
	OFFSET (@page-1)*@rowsOfPage ROWS
	FETCH NEXT @rowsOfPage ROWS ONLY
END
GO
/****** Object:  StoredProcedure [dbo].[GetAllPublicPostOfFashionista]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[GetAllPublicPostOfFashionista]
@page INT, @rowsOfPage INT
AS
BEGIN
	SELECT * FROM dbo.Post
	INNER JOIN dbo.Profile ON AccountPost=AccountId AND IsFashionista=1
	WHERE PrivacyID = (SELECT ID FROM Privacy WHERE Name = 'Public') AND IsVerified = 1
	ORDER BY [Time] DESC
	OFFSET (@page-1)*@rowsOfPage ROWS
	FETCH NEXT @rowsOfPage ROWS ONLY
END
GO
/****** Object:  StoredProcedure [dbo].[GetAllPublicPostOfUser]    Script Date: 24/04/2021 14:51:04 ******/
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
	AND PrivacyID = (SELECT ID FROM Privacy WHERE Name = 'Public') AND IsVerified = 1
	ORDER BY [Time] DESC
	OFFSET (@page-1)*@rowsOfPage ROWS
	FETCH NEXT @rowsOfPage ROWS ONLY
END
GO
/****** Object:  StoredProcedure [dbo].[GetAllRateOfPost]    Script Date: 24/04/2021 14:51:04 ******/
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
/****** Object:  StoredProcedure [dbo].[GetAllReason]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[GetAllReason]
AS
BEGIN
	SELECT * FROM dbo.Reason
END
GO
/****** Object:  StoredProcedure [dbo].[GetAllreasonOfReport]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[GetAllreasonOfReport]
@reportID INT
AS
BEGIN
	SELECT Reason.Id, Name, Description, ReportTypeID FROM dbo.ReportReason
	INNER JOIN dbo.Reason ON Reason.Id=ReasonId
	WHERE ReportId = @reportID
END
GO
/****** Object:  StoredProcedure [dbo].[GetAllReport]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[GetAllReport]
AS
BEGIN
	SELECT dbo.Report.*, dbo.ReportType.Name, dbo.ReportType.Description FROM dbo.Report
	INNER JOIN dbo.ReportType ON ReportType.Id = Report.TypeReport
END
GO
/****** Object:  StoredProcedure [dbo].[GetAllReportComment]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[GetAllReportComment]
AS
BEGIN
	SELECT dbo.Report.*, dbo.ReportType.Name, dbo.ReportType.Description FROM dbo.Report
	INNER JOIN dbo.ReportType ON ReportType.Id = Report.TypeReport
	WHERE TypeReport = (SELECT Id FROM dbo.ReportType WHERE Name = 'Comment')
END
GO
/****** Object:  StoredProcedure [dbo].[GetAllReportFromAccount]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[GetAllReportFromAccount]
@accountID INT
AS
BEGIN
	SELECT dbo.Report.*, dbo.ReportType.Name, dbo.ReportType.Description FROM dbo.Report
	INNER JOIN dbo.ReportType ON ReportType.Id = Report.TypeReport
	WHERE FromAccount = @accountID
END
GO
/****** Object:  StoredProcedure [dbo].[GetAllReportPost]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[GetAllReportPost]
AS
BEGIN
	SELECT dbo.Report.*, dbo.ReportType.Name, dbo.ReportType.Description FROM dbo.Report
	INNER JOIN dbo.ReportType ON ReportType.Id = Report.TypeReport
	WHERE TypeReport = (SELECT Id FROM dbo.ReportType WHERE Name = 'Post')
END
GO
/****** Object:  StoredProcedure [dbo].[GetAllReportToAccount]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[GetAllReportToAccount]
@accountID INT
AS
BEGIN
	SELECT dbo.Report.*, dbo.ReportType.Name, dbo.ReportType.Description FROM dbo.Report
	INNER JOIN dbo.ReportType ON ReportType.Id = Report.TypeReport
	WHERE ToAccount = @accountID
END
GO
/****** Object:  StoredProcedure [dbo].[GetAllReportToComment]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[GetAllReportToComment]
@commentID INT
AS
BEGIN
	SELECT dbo.Report.*, dbo.ReportType.Name, dbo.ReportType.Description FROM dbo.Report
	INNER JOIN dbo.ReportType ON ReportType.Id = Report.TypeReport
	WHERE ToPost = @commentID
END
GO
/****** Object:  StoredProcedure [dbo].[GetAllReportToPost]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[GetAllReportToPost]
@postID INT
AS
BEGIN
	SELECT dbo.Report.*, dbo.ReportType.Name, dbo.ReportType.Description FROM dbo.Report
	INNER JOIN dbo.ReportType ON ReportType.Id = Report.TypeReport
	WHERE ToPost = @postID
END
GO
/****** Object:  StoredProcedure [dbo].[GetAllReportUser]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[GetAllReportUser]
AS
BEGIN
	SELECT dbo.Report.*, dbo.ReportType.Name, dbo.ReportType.Description FROM dbo.Report
	INNER JOIN dbo.ReportType ON ReportType.Id = Report.TypeReport
	WHERE TypeReport = (SELECT Id FROM dbo.ReportType WHERE Name = 'User')
END
GO
/****** Object:  StoredProcedure [dbo].[GetAllTypeReport]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[GetAllTypeReport]
AS
BEGIN
	SELECT * FROM dbo.ReportType
END
GO
/****** Object:  StoredProcedure [dbo].[GetAllUserFeedback]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[GetAllUserFeedback]
AS
BEGIN
    SELECT *
	FROM Feedback f, Account a
	WHERE f.UserFeedbackId = a.Id
	ORDER BY f.LastUpdated DESC
END
GO
/****** Object:  StoredProcedure [dbo].[GetAllUserSearch]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create PROCEDURE [dbo].[GetAllUserSearch]
@AccountID int
AS
BEGIN

Select  *
From(select * 
from Account a , [Profile] p
where a.Id =p.AccountId and a.IsActive=1 and a.IsBlock =0) as A
Where A.AccountId<>@AccountID
END;
GO
/****** Object:  StoredProcedure [dbo].[GetAllUserWithoutPaging]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create PROCEDURE [dbo].[GetAllUserWithoutPaging]
AS
	SELECT c.Id, c.UserName, p.Email, p.FirstName, p.LastName, p.Phone, p.Avatar, c.DateCreated, c.IsActive 
	FROM Account c inner join Profile p on c.Id = p.AccountId
	ORDER BY c.DateCreated DESC
GO
/****** Object:  StoredProcedure [dbo].[GetAllVoucher]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[GetAllVoucher]
AS
Begin
select v.Id, v.Title, v.Content, v.Code, a.UserName as createdBy, v.ToDate as expiredDate
from Voucher v inner join AccountVoucher av on v.Id = av.VoucherId inner join Account a on av.AccountId = a.Id
End
GO
/****** Object:  StoredProcedure [dbo].[getBalanceByAccountID]    Script Date: 24/04/2021 14:51:04 ******/
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
/****** Object:  StoredProcedure [dbo].[GetConversationBy2AccountId]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[GetConversationBy2AccountId]
(@AccountId1 int, @AccountId2 int)
AS
BEGIN
SELECT * FROM Conversation
Where (AccountId1 = @AccountId1 and AccountId2 = @AccountId2) or (AccountId1 = @AccountId2 and AccountId2 = @AccountId1)
END
GO
/****** Object:  StoredProcedure [dbo].[GetDetailUserSupport]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetDetailUserSupport]
AS
	SELECT c.Id as UserId, c.UserName, p.Email, p.Phone, p.FirstName, p.LastName, sr.id as RequestId, sr.RequestType, sr.TimeCreate, sr.Status
	FROM Profile p inner join Account c on p.AccountId = c.Id inner join AccountRole ar on c.Id = ar.AccountId 
	inner join Role r on ar.RoleId = r.Id
	inner join SupportRequest sr on c.id = sr.UserRequestId
	ORDER BY sr.TimeCreate DESC
GO
/****** Object:  StoredProcedure [dbo].[GetFeedbackById]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[GetFeedbackById]
@feedbackId int
AS
BEGIN
SELECT * FROM Feedback
WHERE Id = @feedbackId
END
GO
/****** Object:  StoredProcedure [dbo].[GetFeedbackByUserId]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[GetFeedbackByUserId]
@userId int
AS
BEGIN
SELECT * FROM Feedback
WHERE UserFeedbackId = @userId
ORDER BY LastUpdated DESC
END
GO
/****** Object:  StoredProcedure [dbo].[GetFollowerCount]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[GetFollowerCount]
@userId int
AS
BEGIN
SELECT COUNT(*) FROM AccountRelation
WHERE AccountId2 = @userId and RelationType = 1
END
GO
/****** Object:  StoredProcedure [dbo].[GetImagePostByID]    Script Date: 24/04/2021 14:51:04 ******/
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
/****** Object:  StoredProcedure [dbo].[GetImagesOfPostByPostID]    Script Date: 24/04/2021 14:51:04 ******/
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
/****** Object:  StoredProcedure [dbo].[GetInfoByAccountID]    Script Date: 24/04/2021 14:51:04 ******/
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
/****** Object:  StoredProcedure [dbo].[GetInfoByID]    Script Date: 24/04/2021 14:51:04 ******/
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
/****** Object:  StoredProcedure [dbo].[GetLastReceiveMessage]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[GetLastReceiveMessage]
@accountID INT, @chatWithAccountID INT
AS
BEGIN
    SELECT TOP(1)* FROM dbo.Message WHERE ToAccountId=@accountID AND FromAccountId = @chatWithAccountID AND ReceiverDeleted = 0
	ORDER BY Time DESC
END
GO
/****** Object:  StoredProcedure [dbo].[getLatMessage]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[getLatMessage]
@AccountID int,
@ChatWithAccountId int

AS
BEGIN
Select @AccountID AccountId, P.AccountId ChatWithAccountId, A.[Time] TimeUpdate, A.[Content] lastMessage, A.[FromAccountId] lastSender, P.[FirstName] ChatWithFirstName, P.[LastName] ChatWithLastName, P.[Avatar] ChatWithAvatar, P.[Avatar] ChatWithAvatarUri, A.IsRead
From (select Top(1) *
from Message m
where ((m.FromAccountId = @AccountID and m.ToAccountId = @ChatWithAccountId and m.SenderDeleted = 0 ) or (m.FromAccountId = @ChatWithAccountId and m.ToAccountId = @AccountID and m.ReceiverDeleted = 0)) 
order by m.[Time] DESC) as A Join Profile P
on (@ChatWithAccountId = P.AccountId)
END
GO
/****** Object:  StoredProcedure [dbo].[GetLikeOfUserForPost]    Script Date: 24/04/2021 14:51:04 ******/
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
/****** Object:  StoredProcedure [dbo].[GetListAccountChat]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetListAccountChat]
@AccountID int
AS
BEGIN
SELECT *
From(SELECT c.AccountId1 withAccountId, c.TimeUpdate
From [Conversation] c
where c.AccountId2=@AccountID
Union
SELECT c.AccountId2 withAccountId, c.TimeUpdate
From [Conversation] c
where c.AccountId1=@AccountID) as Co
ORder by Co.TimeUpdate DESC
END;
GO
/****** Object:  StoredProcedure [dbo].[GetListFollower]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[GetListFollower]
@userId int
AS
BEGIN
SELECT AccountId1 FROM AccountRelation
WHERE AccountId2 = @userId and RelationType = 1
END
GO
/****** Object:  StoredProcedure [dbo].[GetMailContentByCode]    Script Date: 24/04/2021 14:51:04 ******/
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
/****** Object:  StoredProcedure [dbo].[GetMailContentByID]    Script Date: 24/04/2021 14:51:04 ******/
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
/****** Object:  StoredProcedure [dbo].[GetMarkupPostByPostIDAndAccountID]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[GetMarkupPostByPostIDAndAccountID]
@postID INT, @accountID INT
AS
BEGIN
	SELECT * FROM MarkupPost WHERE PostID = @postID AND accountID = @accountID
END
GO
/****** Object:  StoredProcedure [dbo].[GetMarkupPostOfUser]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[GetMarkupPostOfUser]
@accountID INT, @page INT, @rowsOfPage INT
AS
BEGIN
	SELECT Post.* FROM MarkupPost
	INNER JOIN Post ON Post.Id = MarkupPost.PostID
	WHERE AccountId = @accountID
	ORDER BY MarkupPost.id ASC
	OFFSET (@page-1)*@rowsOfPage ROWS
	FETCH NEXT @rowsOfPage ROWS ONLY
END
GO
/****** Object:  StoredProcedure [dbo].[getMessageByConversationId]    Script Date: 24/04/2021 14:51:04 ******/
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
  order by Message.Time ASC
END
GO
/****** Object:  StoredProcedure [dbo].[GetMessageByID]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[GetMessageByID]
@messID INT
AS
BEGIN
	SELECT * FROM dbo.Message WHERE Id = @messID
END
GO
/****** Object:  StoredProcedure [dbo].[getMessageBySenderAndReceiverID]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
  CREATE PROC [dbo].[getMessageBySenderAndReceiverID]
  @userId1 int,
  @userId2 int,
  @page int,
  @rowsOfPage int
  AS
  BEGIN
  SELECT Message.Id, Message.FromAccountId, Message.ToAccountId, Message.Content, Message.SenderDeleted, Message.ReceiverDeleted, Message.IsRead, Message.ConversationId,Message.Time, MessageImage.Url
  FROM dbo.Message
  LEFT OUTER JOIN dbo.MessageImage
  ON Message.Id = MessageImage.MessageId
  where (Message.FromAccountId = @userId1 and Message.ToAccountId = @userId2 and SenderDeleted = 0 ) or (Message.FromAccountId = @userId2 and Message.ToAccountId = @userId1 and ReceiverDeleted = 0)
  order by Message.Time DESC
  OFFSET (@page-1)*@rowsOfPage ROWS
  FETCH NEXT @rowsOfPage ROWS ONLY
  END
GO
/****** Object:  StoredProcedure [dbo].[getNotificationByToAccount]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[getNotificationByToAccount]
@accountID int, @page INT, @rowsOfPage INT
AS
BEGIN
	SELECT *, DATEDIFF(day,Notification.DateCreated,GETDATE()) AS CountDate
	FROM dbo.[Notification]
	WHERE ToAccount = @accountID AND DATEDIFF(day,Notification.DateCreated,GETDATE()) < 5
	ORDER BY IsRead ASC, DateCreated desc
	OFFSET (@page-1)*@rowsOfPage ROWS
	FETCH NEXT @rowsOfPage ROWS ONLY
END
GO
/****** Object:  StoredProcedure [dbo].[GetNumberUnreadMessage]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[GetNumberUnreadMessage]
@userID INT
AS
BEGIN
	SELECT COUNT(DISTINCT(ConversationId)) 
	FROM Message
	WHERE (ToAccountId = @userID AND ReceiverDeleted = 0) AND IsRead = 0 
END
GO
/****** Object:  StoredProcedure [dbo].[getPeopleFollowByAccountID]    Script Date: 24/04/2021 14:51:04 ******/
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
/****** Object:  StoredProcedure [dbo].[GetPostByBodyInfoID]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[GetPostByBodyInfoID]
@bodyInfoID INT, @page INT, @rowsOfPage INT
AS
BEGIN
	SELECT Post.Id, Content, PrivacyID, [Name] AS Privacy, [Time], AccountPost, FirstName, LastName, Avatar, BodyInfoID, RatingAvg.Average AS RateAVG, IsVerified, [Type]
	FROM dbo.Post
	INNER JOIN dbo.[Profile] ON AccountPost = dbo.[Profile].AccountId
	INNER JOIN dbo.Privacy ON Privacy.Id = PrivacyID
	INNER JOIN 
	(
		SELECT PostId, AVG(CAST(RatePoint AS FLOAT))  AS Average 
		FROM dbo.Rate 
		GROUP BY PostId
	) AS RatingAvg ON RatingAvg.PostId = Post.Id
	WHERE Post.BodyInfoID = @bodyInfoID AND RatingAvg.Average>=(CAST(3.5 AS FLOAT)) AND IsVerified = 1
	ORDER BY RateAVG DESC, Time DESC
	OFFSET (@page-1)*@rowsOfPage ROWS
	FETCH NEXT @rowsOfPage ROWS ONLY
END
GO
/****** Object:  StoredProcedure [dbo].[GetPostByID]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[GetPostByID]
@postID INT
AS
BEGIN
	SELECT Post.Id, Content, PrivacyID, [Name] AS Privacy, [Time], AccountPost, FirstName, LastName, Avatar, BodyInfoID, IsVerified, [Type]
	FROM dbo.Post
	INNER JOIN dbo.[Profile] ON AccountPost = dbo.[Profile].AccountId
	INNER JOIN dbo.Privacy ON Privacy.Id = PrivacyID
	WHERE Post.Id = @postID;
END
GO
/****** Object:  StoredProcedure [dbo].[GetPostByInfoID]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[GetPostByInfoID]
@infoID INT, @page INT, @rowsOfPage INT
AS
BEGIN
	SELECT * FROM Post
	WHERE BodyInfoID = @infoID AND PrivacyID = (SELECT ID FROM Privacy WHERE Name = 'Public') AND IsVerified = 1
	ORDER BY [Time] DESC
	OFFSET (@page-1)*@rowsOfPage ROWS
	FETCH NEXT @rowsOfPage ROWS ONLY
END
GO
/****** Object:  StoredProcedure [dbo].[GetPostByUserWithoutPaging]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetPostByUserWithoutPaging]
@AccountId INT
AS
BEGIN
	SELECT *
	FROM Post p
	WHERE p.AccountPost = @AccountId
	ORDER BY p.Time DESC
END
GO
/****** Object:  StoredProcedure [dbo].[GetPostRateAverage]    Script Date: 24/04/2021 14:51:04 ******/
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
/****** Object:  StoredProcedure [dbo].[GetProfileByAccountID]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[GetProfileByAccountID]
@id INT
AS
BEGIN
	SELECT Account.Id, UserName, IsActive,IsBlock, Profile.AccountId, FirstName, LastName, Gender, DOB, Email, Phone, Address, Avatar, [Role].[Name] AS [role], IsFashionista
	FROM dbo.Account 
	INNER JOIN dbo.Profile ON Profile.AccountId = Account.Id
    INNER JOIN dbo.AccountRole ON AccountRole.AccountId = Account.Id
    INNER JOIN dbo.Role ON Role.Id = AccountRole.RoleId
	WHERE Account.Id = @id
END


GO
/****** Object:  StoredProcedure [dbo].[GetProfileByEmail]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[GetProfileByEmail]
@email VARCHAR(50)
AS
BEGIN
	SELECT Account.Id, UserName, IsActive,IsBlock, Profile.AccountId, FirstName, LastName, Gender, DOB, Email, Phone, Address, Avatar, [Role].[Name] AS [role] , IsFashionista
	FROM dbo.Account
	INNER JOIN dbo.Profile ON Profile.AccountId = Account.Id
	INNER JOIN dbo.AccountRole ON AccountRole.Id = Account.Id
	INNER JOIN dbo.Role ON Role.Id = AccountRole.Id
	WHERE Email = @email
END
GO
/****** Object:  StoredProcedure [dbo].[GetProfileByName]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[GetProfileByName]
@keyword NVARCHAR(MAX), @page INT, @rowsOfPage INT
AS
BEGIN
	SELECT Account.Id, UserName, IsActive,IsBlock, Profile.AccountId, FirstName, LastName, Gender, DOB, Email, Phone, Address, Avatar, [Role].[Name] AS [role] , IsFashionista
	FROM dbo.Account 
	INNER JOIN dbo.Profile ON Profile.AccountId = Account.Id
    INNER JOIN dbo.AccountRole ON AccountRole.AccountId = Account.Id
    INNER JOIN dbo.Role ON Role.Id = AccountRole.RoleId
	WHERE CONCAT(FirstName, ' ', LastName) LIKE '%'+@keyword+'%'
	ORDER BY Account.Id
	OFFSET (@page-1)*@rowsOfPage ROWS
	FETCH NEXT @rowsOfPage ROWS ONLY
END
GO
/****** Object:  StoredProcedure [dbo].[GetProfileByPhone]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[GetProfileByPhone]
@phone VARCHAR(50)
AS
BEGIN
	SELECT Account.Id, UserName, IsActive,IsBlock, Profile.AccountId, FirstName, LastName, Gender, DOB, Email, Phone, Address, Avatar, [Role].[Name] AS [role], IsFashionista
	FROM dbo.Account
	INNER JOIN dbo.Profile ON Profile.AccountId = Account.Id
	INNER JOIN dbo.AccountRole ON AccountRole.Id = Account.Id
	INNER JOIN dbo.Role ON Role.Id = AccountRole.RoleId
	WHERE [Profile].Phone = @phone
END
GO
/****** Object:  StoredProcedure [dbo].[GetProfileByUsername]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[GetProfileByUsername]
@username VARCHAR(50)
AS
BEGIN
	SELECT Account.Id, UserName, IsActive,IsBlock, Profile.AccountId, FirstName, LastName, Gender, DOB, Email, Phone, Address, Avatar, [Role].[Name] AS [role], IsFashionista
	FROM dbo.Account
	INNER JOIN dbo.Profile ON Profile.AccountId = Account.Id
	INNER JOIN dbo.AccountRole ON AccountRole.Id = Account.Id
	INNER JOIN dbo.Role ON Role.Id = AccountRole.Id
	WHERE UserName = @username
END
GO
/****** Object:  StoredProcedure [dbo].[GetRateOfUserForPost]    Script Date: 24/04/2021 14:51:04 ******/
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
/****** Object:  StoredProcedure [dbo].[GetReportTypeByID]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[GetReportTypeByID]
@typeID INT
AS
BEGIN
	SELECT * FROM dbo.ReportType WHERE Id = @typeID
END
GO
/****** Object:  StoredProcedure [dbo].[GetSupportRequest]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[GetSupportRequest]
(@userId int, @requestType int)
AS
BEGIN
SELECT * FROM SupportRequest
WHERE UserRequestId = @userId and RequestType = @requestType
END
GO
/****** Object:  StoredProcedure [dbo].[getTransactionHistoryByAccountID]    Script Date: 24/04/2021 14:51:04 ******/
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
/****** Object:  StoredProcedure [dbo].[GetUserBalanceById]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[GetUserBalanceById]
@AccountId INT
AS
BEGIN
 SELECT *
 FROM Transactions t inner join AccountLogs al on t.Id = al.TransactionId
 where AccountID = @AccountId
END
GO
/****** Object:  StoredProcedure [dbo].[GetUserById]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetUserById] @Id int
AS
	SELECT c.Id, c.UserName, c.Password, c.IsActive, c.IsBlock, p.Email, p.Phone, r.Id as RoleId, r.Name as RoleName, p.FirstName, p.LastName
	FROM Profile p inner join Account c on p.AccountId = c.Id inner join AccountRole ar on c.Id = ar.AccountId inner join Role r on ar.RoleId = r.Id
	WHERE c.Id = @Id
GO
/****** Object:  StoredProcedure [dbo].[GetUserByUserName]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetUserByUserName] @Username nvarchar(50)
AS
	SELECT * FROM Account c inner join Profile p on c.Id = p.AccountId
	WHERE c.UserName = @Username
GO
/****** Object:  StoredProcedure [dbo].[GetUserDetailByID]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[GetUserDetailByID]
@AccountId INT
AS
BEGIN
    SELECT a.Id, a.UserName, a.IsActive, a.DateCreated, p.FirstName, p.LastName, p.Gender, p.DOB, p.Email, p.Phone, p.Address, p.Avatar, i.height, i.weight, i.WaistSize, i.BustSize, i.HipSize
	FROM Account a inner join Profile p on a.Id = p.AccountId left join Info i on p.AccountId = i.AccountId
	WHERE a.Id = @AccountId
END
GO
/****** Object:  StoredProcedure [dbo].[GetUserWithRoleByEmail]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetUserWithRoleByEmail] @Email nvarchar(50)
AS
	SELECT c.Id, c.UserName, c.Password, c.IsActive, c.IsBlock, p.Email, p.Phone, r.Id as RoleId, r.Name as RoleName, p.FirstName, p.LastName
	FROM Profile p inner join Account c on p.AccountId = c.Id inner join AccountRole ar on c.Id = ar.AccountId inner join Role r on ar.RoleId = r.Id
	WHERE p.Email = @Email
GO
/****** Object:  StoredProcedure [dbo].[GetUserWithRoleByPhone]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetUserWithRoleByPhone] @Phone nvarchar(50)
AS
	SELECT c.Id, c.UserName, c.Password, c.IsActive, c.IsBlock, p.Email, p.Phone, r.Id as RoleId, r.Name as RoleName, p.FirstName, p.LastName
	FROM Profile p inner join Account c on p.AccountId = c.Id inner join AccountRole ar on c.Id = ar.AccountId inner join Role r on ar.RoleId = r.Id
	WHERE p.Phone = @Phone
GO
/****** Object:  StoredProcedure [dbo].[GetUserWithRoleByUserName]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetUserWithRoleByUserName] @Username nvarchar(50)
AS
	SELECT c.Id, c.UserName, c.Password, c.IsActive, c.IsBlock, p.Email, p.Phone, r.Id as RoleId, r.Name as RoleName, p.FirstName, p.LastName
	FROM Profile p inner join Account c on p.AccountId = c.Id inner join AccountRole ar on c.Id = ar.AccountId inner join Role r on ar.RoleId = r.Id
	WHERE c.UserName = @Username
GO
/****** Object:  StoredProcedure [dbo].[getVoucherByAccountID]    Script Date: 24/04/2021 14:51:04 ******/
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
/****** Object:  StoredProcedure [dbo].[GetVoucherById]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[GetVoucherById]
@VoucherId INT
AS
BEGIN
    SELECT v.Id, v.Title, v.Code VoucherCode, v.Content, v.[Description],v.[Image],v.FromDate,v.ToDate,v.IsExpires, av.IsUsed
	FROM Voucher v , AccountVoucher av
	WHERE  v.Id= av.VoucherId
END
GO
/****** Object:  StoredProcedure [dbo].[getVoucherDetailByAccountId]    Script Date: 24/04/2021 14:51:04 ******/
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
/****** Object:  StoredProcedure [dbo].[GiveVoucher]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[GiveVoucher]
@VoucherID int, @UserID int, @IsUsed bit
AS
BEGIN
INSERT INTO [AccountVoucher]
Values (@UserID,@VoucherID,@IsUsed)
END;
GO
/****** Object:  StoredProcedure [dbo].[IsMarkedPost]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[IsMarkedPost]
@postID INT, @accountID INT
AS
BEGIN
	SELECT * FROM MarkupPost WHERE PostID = @postID AND accountID = @accountID
END
GO
/****** Object:  StoredProcedure [dbo].[LikePost]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[LikePost]
@postID INT, @accountLike INT
AS
BEGIN
	DECLARE @likeID INT
	SET @likeID = (SELECT ID FROM [Like] WHERE PostID = @postID AND AccountLike = @accountLike)
	PRINT @likeID
	IF @likeID IS NULL
	BEGIN
		INSERT INTO dbo.[Like]
		(
			PostId,
			AccountLike
		)
		OUTPUT Inserted.ID
		VALUES
		(   @postID, -- PostId - int
			@accountLike  -- AcountLike - int
			)
	END
	ELSE
	BEGIN
		SELECT 0
	END
END
GO
/****** Object:  StoredProcedure [dbo].[MarkAllNotificationAsReaded]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[MarkAllNotificationAsReaded]
@accountID INT
AS
BEGIN
	UPDATE dbo.Notification SET IsRead = 1 WHERE ToAccount = @accountID
END
GO
/****** Object:  StoredProcedure [dbo].[MarkConversationIsReaded]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[MarkConversationIsReaded]
@fromAccount INT, @toAccount INT
AS
BEGIN
	UPDATE dbo.Message SET IsRead = 1 WHERE (ToAccountId = @toAccount) AND (FromAccountId = @fromAccount) AND IsRead = 0 AND ReceiverDeleted = 0
END
GO
/****** Object:  StoredProcedure [dbo].[MarkMessageIsReaded]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[MarkMessageIsReaded]
@messID INT
AS
BEGIN
	UPDATE dbo.Message SET IsRead = 1 WHERE Id = @messID
END
GO
/****** Object:  StoredProcedure [dbo].[RejectSupportRequest]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[RejectSupportRequest] @RequestId int
AS
Begin
	UPDATE SupportRequest
	SET Status = 3
	WHERE SupportRequest.Id = @RequestId
End
GO
/****** Object:  StoredProcedure [dbo].[SearchConversation]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[SearchConversation]
@AccountID int,
@searchValue nvarchar(50)

AS
BEGIN

Select top(10) *
From(select * 
from Account a , [Profile] p
where a.Id =p.AccountId and a.IsActive=1 and a.IsBlock =0) as A
where (A.UserName like '%'+ISNULL(@searchValue,'')+'%' or (A.FirstName + A.LastName) like '%'+ISNULL(@searchValue,'')+'%') and A.AccountId <> @AccountID
END;
GO
/****** Object:  StoredProcedure [dbo].[SearchPostByText]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[SearchPostByText]
@keyWord NVARCHAR(MAX), @page INT, @rowsOfPage INT
AS
BEGIN
	SELECT dbo.Post.* FROM dbo.Post
	INNER JOIN dbo.Profile ON AccountPost = AccountId
	WHERE IsVerified = 1 AND ((Content LIKE '%' + @keyWord + '%') OR (CONCAT(FirstName, ' ', LastName) LIKE '%' + @keyWord + '%'))
	ORDER BY Time DESC
	OFFSET (@page-1)*@rowsOfPage ROWS
	FETCH NEXT @rowsOfPage ROWS ONLY
END
GO
/****** Object:  StoredProcedure [dbo].[SetDeleteFlagForMessage]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[SetDeleteFlagForMessage]
(@messageId int, @isDeletedBySender bit)
AS
IF(@isDeletedBySender = 1)
BEGIN
	UPDATE Message 
	SET SenderDeleted = 1
	WHERE Id = @messageId
END
ELSE
BEGIN
	UPDATE Message 
	SET ReceiverDeleted = 1
	WHERE Id = @messageId
END
GO
/****** Object:  StoredProcedure [dbo].[setReadNotificationByAccountId]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[setReadNotificationByAccountId]
       @AccountId INT
  AS
    BEGIN
     UPDATE Notification 
     SET IsRead=1 
     WHERE ToAccount = @AccountId
    END
GO
/****** Object:  StoredProcedure [dbo].[setReadNotificationById]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[setReadNotificationById]
@ID int
AS
BEGIN
	UPDATE [Notification]
	SET IsRead = 1
	WHERE Id = @ID
END
GO
/****** Object:  StoredProcedure [dbo].[SetUserIsFashionista]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SetUserIsFashionista] @RequestId int, @UserId int
AS
Begin
	UPDATE SupportRequest
	SET Status = 1
	WHERE SupportRequest.Id = @RequestId

	UPDATE Profile
	SET IsFashionista = 1
	WHERE Profile.AccountId = @UserId
End
GO
/****** Object:  StoredProcedure [dbo].[SetUserLockAcount]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SetUserLockAcount] @RequestId int, @UserId int
AS
Begin
	UPDATE SupportRequest
	SET Status = 1
	WHERE SupportRequest.Id = @RequestId

	UPDATE Account
	SET IsActive = 0
	WHERE Account.Id = @UserId
End
GO
/****** Object:  StoredProcedure [dbo].[topUpForAccount]    Script Date: 24/04/2021 14:51:04 ******/
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
/****** Object:  StoredProcedure [dbo].[UnbanUser]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[UnbanUser]
@AccountId INT
AS
BEGIN
	UPDATE Account
	SET IsActive = 1
	WHERE Id = @AccountId;
END
GO
/****** Object:  StoredProcedure [dbo].[UnfollowUser]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[UnfollowUser]
(@followerId int, @userGetFollowId int)
AS
BEGIN
DELETE FROM [dbo].[AccountRelation]
WHERE AccountId1 = @followerId AND AccountId2 = @userGetFollowId AND RelationType = 1
END
GO
/****** Object:  StoredProcedure [dbo].[UnlikePost]    Script Date: 24/04/2021 14:51:04 ******/
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
/****** Object:  StoredProcedure [dbo].[UpdateComment]    Script Date: 24/04/2021 14:51:04 ******/
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
/****** Object:  StoredProcedure [dbo].[UpdateFeedbackStatus]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[UpdateFeedbackStatus]
@feedbackId INT, @lastUpdated DATETIME
AS
BEGIN
	UPDATE Feedback
	SET Status = 2, LastUpdated = @lastUpdated
	WHERE Id = @feedbackId
END
GO
/****** Object:  StoredProcedure [dbo].[UpdateImage]    Script Date: 24/04/2021 14:51:04 ******/
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
/****** Object:  StoredProcedure [dbo].[UpdateImagePostByID]    Script Date: 24/04/2021 14:51:04 ******/
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
/****** Object:  StoredProcedure [dbo].[UpdateInfo]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[UpdateInfo]
@id INT, @height FLOAT, @weight FLOAT, @bustSize FLOAT, @waistSize FLOAT, @hipSize FLOAT, @skinColor INT, @name NVARCHAR(MAX)
AS
BEGIN
	UPDATE Info
	SET height = @height, weight = @weight, BustSize = @bustSize, WaistSize = @waistSize, HipSize = @hipSize, SkinColor = @skinColor, [Name] = @name
	WHERE Id = @id
END
GO
/****** Object:  StoredProcedure [dbo].[UpdatePost]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[UpdatePost]
@postId INT, @content NVARCHAR(MAX), @privacyID INT, @time DATETIME, @bodyInfoID INT, @isVerified BIT
AS
BEGIN
	UPDATE dbo.Post 
	SET Content = @content, PrivacyID = @privacyID, Time = @time, IsVerified = @isVerified, BodyInfoID = @bodyInfoID
	WHERE Id = @postId
END
GO
/****** Object:  StoredProcedure [dbo].[UpdateProfileByAccountID]    Script Date: 24/04/2021 14:51:04 ******/
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
/****** Object:  StoredProcedure [dbo].[UpdateRate]    Script Date: 24/04/2021 14:51:04 ******/
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
/****** Object:  StoredProcedure [dbo].[UpdateReason]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[UpdateReason]
@reasonID INT, @name NVARCHAR(MAX), @des NVARCHAR(MAX)
AS
BEGIN
	UPDATE dbo.Reason SET Name = @name, Description = @des WHERE Id = @reasonID
END
GO
/****** Object:  StoredProcedure [dbo].[UpdateReport]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[UpdateReport]
@reportID INT, @fromAccount INT, @toAccount INT, @toPost INT, @toComment INT, @typeReport INT, @reportContent NVARCHAR(MAX), @isProcessed INT
AS
BEGIN
	UPDATE dbo.Report SET 
	FromAccount = @fromAccount, 
	ToAccount = @toAccount, 
	ToPost = @toPost, 
	TypeReport = @typeReport, 
	ReportContent = @reportContent
	WHERE Id = @reportID
END
GO
/****** Object:  StoredProcedure [dbo].[UpdateReportStatus]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create PROCEDURE [dbo].[UpdateReportStatus] @ReportId int
AS
Begin
	UPDATE Report
	SET IsProcessed = 1
	WHERE Id = @ReportId
End
GO
/****** Object:  StoredProcedure [dbo].[UpdateReportType]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[UpdateReportType]
@typeID INT, @name NVARCHAR(MAX), @des NVARCHAR(MAX)
AS
BEGIN
	UPDATE dbo.RelationType SET Name = @name, Description = @des WHERE Id = @typeID
END
GO
/****** Object:  StoredProcedure [dbo].[UpdateUserPassword]    Script Date: 24/04/2021 14:51:04 ******/
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
/****** Object:  StoredProcedure [dbo].[UseVoucher]    Script Date: 24/04/2021 14:51:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[UseVoucher]
@accountID INT, @voucherID INT
AS
BEGIN
	UPDATE dbo.AccountVoucher SET IsUsed = 1 WHERE AccountId = @accountID AND VoucherId = @voucherID
END
GO
USE [master]
GO
ALTER DATABASE [CapstoneNoneData] SET  READ_WRITE 
GO
