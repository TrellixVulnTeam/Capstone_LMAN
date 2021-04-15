USE [CapstonesNoRelationTest]
GO
/****** Object:  Table [dbo].[Account]    Script Date: 4/14/2021 10:34:58 AM ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AccountLogs]    Script Date: 4/14/2021 10:34:59 AM ******/
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
/****** Object:  Table [dbo].[AccountRelation]    Script Date: 4/14/2021 10:34:59 AM ******/
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
/****** Object:  Table [dbo].[AccountRole]    Script Date: 4/14/2021 10:34:59 AM ******/
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
/****** Object:  Table [dbo].[AccountVoucher]    Script Date: 4/14/2021 10:34:59 AM ******/
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
/****** Object:  Table [dbo].[Comment]    Script Date: 4/14/2021 10:34:59 AM ******/
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
/****** Object:  Table [dbo].[Conversation]    Script Date: 4/14/2021 10:34:59 AM ******/
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
/****** Object:  Table [dbo].[Feedback]    Script Date: 4/14/2021 10:34:59 AM ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Image]    Script Date: 4/14/2021 10:34:59 AM ******/
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
/****** Object:  Table [dbo].[Info]    Script Date: 4/14/2021 10:34:59 AM ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Like]    Script Date: 4/14/2021 10:34:59 AM ******/
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
/****** Object:  Table [dbo].[MailContent]    Script Date: 4/14/2021 10:34:59 AM ******/
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
/****** Object:  Table [dbo].[MarkUpPost]    Script Date: 4/14/2021 10:34:59 AM ******/
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
/****** Object:  Table [dbo].[Message]    Script Date: 4/14/2021 10:34:59 AM ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MessageImage]    Script Date: 4/14/2021 10:34:59 AM ******/
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
/****** Object:  Table [dbo].[Notification]    Script Date: 4/14/2021 10:34:59 AM ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[OTP]    Script Date: 4/14/2021 10:34:59 AM ******/
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
/****** Object:  Table [dbo].[Post]    Script Date: 4/14/2021 10:34:59 AM ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Privacy]    Script Date: 4/14/2021 10:34:59 AM ******/
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
/****** Object:  Table [dbo].[Profile]    Script Date: 4/14/2021 10:34:59 AM ******/
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
/****** Object:  Table [dbo].[Rate]    Script Date: 4/14/2021 10:34:59 AM ******/
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
/****** Object:  Table [dbo].[Rating]    Script Date: 4/14/2021 10:34:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Rating](
	[Average] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Reason]    Script Date: 4/14/2021 10:34:59 AM ******/
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
/****** Object:  Table [dbo].[RelationType]    Script Date: 4/14/2021 10:34:59 AM ******/
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
/****** Object:  Table [dbo].[Report]    Script Date: 4/14/2021 10:34:59 AM ******/
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
/****** Object:  Table [dbo].[ReportReason]    Script Date: 4/14/2021 10:34:59 AM ******/
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
/****** Object:  Table [dbo].[ReportType]    Script Date: 4/14/2021 10:34:59 AM ******/
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
/****** Object:  Table [dbo].[Role]    Script Date: 4/14/2021 10:34:59 AM ******/
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
/****** Object:  Table [dbo].[SupportRequest]    Script Date: 4/14/2021 10:34:59 AM ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SupportRequestType]    Script Date: 4/14/2021 10:34:59 AM ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Transactions]    Script Date: 4/14/2021 10:34:59 AM ******/
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
/****** Object:  Table [dbo].[TransactionType]    Script Date: 4/14/2021 10:34:59 AM ******/
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
/****** Object:  Table [dbo].[TypeAction]    Script Date: 4/14/2021 10:34:59 AM ******/
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
/****** Object:  Table [dbo].[TypeNotification]    Script Date: 4/14/2021 10:34:59 AM ******/
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
/****** Object:  Table [dbo].[Voucher]    Script Date: 4/14/2021 10:34:59 AM ******/
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
SET IDENTITY_INSERT [dbo].[Account] ON 

INSERT [dbo].[Account] ([Id], [UserName], [Password], [IsActive], [IsBlock], [DateCreated]) VALUES (1, N'dunghv', N'123', 1, 0, NULL)
INSERT [dbo].[Account] ([Id], [UserName], [Password], [IsActive], [IsBlock], [DateCreated]) VALUES (2, N'asd', N'asdqwe', 1, 0, NULL)
INSERT [dbo].[Account] ([Id], [UserName], [Password], [IsActive], [IsBlock], [DateCreated]) VALUES (3, N'hehehe', N'$2a$11$jwHDCwLlspSiP/eJSRcHFe8Mm4nlRh6Yqe7c9s8tZLnqvLzx/AWXS', 1, 0, NULL)
INSERT [dbo].[Account] ([Id], [UserName], [Password], [IsActive], [IsBlock], [DateCreated]) VALUES (4, N'user', N'$2a$11$I9.s0v5v1Zxt3v.Sz1dVb.1tlDXC.8/GjzTknUifWsikVrr6ozlk6', 1, 0, NULL)
INSERT [dbo].[Account] ([Id], [UserName], [Password], [IsActive], [IsBlock], [DateCreated]) VALUES (5, N'Test123', N'$2a$11$pJfr3I9ia.mTT2ImHx0PTegNwhOc4c2ecWj92QGc1mT4u64ZHrUCu', 1, 0, NULL)
INSERT [dbo].[Account] ([Id], [UserName], [Password], [IsActive], [IsBlock], [DateCreated]) VALUES (6, N'Test99', N'$2a$11$w7xHjsGoBazaWWNIQmqeKOMrTE5TMAOtC.1Yz6S7wRikaQj.OvLpC', 1, 0, NULL)
INSERT [dbo].[Account] ([Id], [UserName], [Password], [IsActive], [IsBlock], [DateCreated]) VALUES (7, N'VienMV', N'$2a$11$pBFLpEcASneo6tLYqPBj6OBkh/PceFCIn13RSizb6t3h371ey.g.S', 1, 0, NULL)
INSERT [dbo].[Account] ([Id], [UserName], [Password], [IsActive], [IsBlock], [DateCreated]) VALUES (8, N'Aeri12345', N'$2a$11$7lDaEw0uhhWjp4olCiKq0.eMR7.0SvPMH/APx3jkuSqsiPJ.K/yd.', 1, 0, NULL)
INSERT [dbo].[Account] ([Id], [UserName], [Password], [IsActive], [IsBlock], [DateCreated]) VALUES (9, N'provip', N'$2a$11$fREqGVOD.IMVPlIjxU6O7eX04mPWKHOKpthHETZvG7dBfNrHCuhUi', 1, 0, NULL)
INSERT [dbo].[Account] ([Id], [UserName], [Password], [IsActive], [IsBlock], [DateCreated]) VALUES (10, N'provip123', N'$2a$11$BqYXx54tX6oJ04SuwncTJ.Yu8z9KSvcADJ2uE8Vq3UphKC/6LlQxq', 1, 0, NULL)
INSERT [dbo].[Account] ([Id], [UserName], [Password], [IsActive], [IsBlock], [DateCreated]) VALUES (11, N'123456', N'$2a$11$eHjHmgtRnA3l5ycLIuP7gOgzMDJBDBSuR7F9wV3UhvDXzhuwZxx2W', 1, 0, NULL)
INSERT [dbo].[Account] ([Id], [UserName], [Password], [IsActive], [IsBlock], [DateCreated]) VALUES (12, N'Kakaka', N'$2a$11$jdruc4/cOxf1EfgUa9LkFeAS9CkIBp42VQ024JzZpbmGktB69eOkm', 1, 0, NULL)
INSERT [dbo].[Account] ([Id], [UserName], [Password], [IsActive], [IsBlock], [DateCreated]) VALUES (13, N'dungtest', N'$2a$11$urSV8SXvHC0M25kEtli.X.vAhbrWWHwcOGAmDLV7VoR6G4Z98es0.', 1, 0, NULL)
INSERT [dbo].[Account] ([Id], [UserName], [Password], [IsActive], [IsBlock], [DateCreated]) VALUES (17, N'google637521378575997760', N'$2a$11$ciy8fMVPUsZmC1tYQh8Bben7Y.JrV23KI//lVz8ISmEueR3Y/UUGC', 1, 0, NULL)
INSERT [dbo].[Account] ([Id], [UserName], [Password], [IsActive], [IsBlock], [DateCreated]) VALUES (18, N'Andeptrai', N'$2a$11$dkyojum3nDPkBYaZ.WHpW.gEIrRdCUVCBsfNkTNx/aPqk1c7ycwvi', 1, 0, NULL)
INSERT [dbo].[Account] ([Id], [UserName], [Password], [IsActive], [IsBlock], [DateCreated]) VALUES (19, N'admin', N'$2a$11$tDpe3wgRaZDW4XtONggAuOqYTcRJDGCXtL39v178S.nRhfNnGbvC6', 1, 0, CAST(N'2021-04-07T16:15:06.360' AS DateTime))
INSERT [dbo].[Account] ([Id], [UserName], [Password], [IsActive], [IsBlock], [DateCreated]) VALUES (20, N'VienMV666', N'$2a$11$RRVVe3UAAzPFFiNvHj/5Ru0/TeERQEbU.KPZOf6FoCXnE1hBDwj2m', 1, 0, CAST(N'2021-04-13T03:51:19.027' AS DateTime))
SET IDENTITY_INSERT [dbo].[Account] OFF
GO
SET IDENTITY_INSERT [dbo].[AccountLogs] ON 

INSERT [dbo].[AccountLogs] ([Id], [AccountID], [BeforeBalance], [AfterBalance], [CheckSum], [TransactionId]) VALUES (1, 5, CAST(0.000000 AS Decimal(18, 6)), CAST(500000.000000 AS Decimal(18, 6)), N'6AF20C8627', 1)
INSERT [dbo].[AccountLogs] ([Id], [AccountID], [BeforeBalance], [AfterBalance], [CheckSum], [TransactionId]) VALUES (2, 5, CAST(500000.000000 AS Decimal(18, 6)), CAST(900000.000000 AS Decimal(18, 6)), N'ACC791C69B', 2)
INSERT [dbo].[AccountLogs] ([Id], [AccountID], [BeforeBalance], [AfterBalance], [CheckSum], [TransactionId]) VALUES (3, 5, CAST(900000.000000 AS Decimal(18, 6)), CAST(1600000.000000 AS Decimal(18, 6)), N'58402CA6ED', 3)
INSERT [dbo].[AccountLogs] ([Id], [AccountID], [BeforeBalance], [AfterBalance], [CheckSum], [TransactionId]) VALUES (4, 5, CAST(1600000.000000 AS Decimal(18, 6)), CAST(1800000.000000 AS Decimal(18, 6)), N'E22A76A46E', 4)
INSERT [dbo].[AccountLogs] ([Id], [AccountID], [BeforeBalance], [AfterBalance], [CheckSum], [TransactionId]) VALUES (5, 5, CAST(1800000.000000 AS Decimal(18, 6)), CAST(2100000.000000 AS Decimal(18, 6)), N'9ED71D4933', 5)
INSERT [dbo].[AccountLogs] ([Id], [AccountID], [BeforeBalance], [AfterBalance], [CheckSum], [TransactionId]) VALUES (6, 7, CAST(0.000000 AS Decimal(18, 6)), CAST(300000.000000 AS Decimal(18, 6)), N'77E6157925', 6)
INSERT [dbo].[AccountLogs] ([Id], [AccountID], [BeforeBalance], [AfterBalance], [CheckSum], [TransactionId]) VALUES (7, 7, CAST(300000.000000 AS Decimal(18, 6)), CAST(600000.000000 AS Decimal(18, 6)), N'DD135723D9', 7)
INSERT [dbo].[AccountLogs] ([Id], [AccountID], [BeforeBalance], [AfterBalance], [CheckSum], [TransactionId]) VALUES (8, 7, CAST(600000.000000 AS Decimal(18, 6)), CAST(1100000.000000 AS Decimal(18, 6)), N'061AE85BF2', 8)
INSERT [dbo].[AccountLogs] ([Id], [AccountID], [BeforeBalance], [AfterBalance], [CheckSum], [TransactionId]) VALUES (9, 7, CAST(1100000.000000 AS Decimal(18, 6)), CAST(1600000.000000 AS Decimal(18, 6)), N'E0C99C5EA4', 9)
SET IDENTITY_INSERT [dbo].[AccountLogs] OFF
GO
SET IDENTITY_INSERT [dbo].[AccountRelation] ON 

INSERT [dbo].[AccountRelation] ([Id], [AccountId1], [AccountId2], [RelationType]) VALUES (1, 1, 4, 1)
INSERT [dbo].[AccountRelation] ([Id], [AccountId1], [AccountId2], [RelationType]) VALUES (2, 2, 4, 1)
INSERT [dbo].[AccountRelation] ([Id], [AccountId1], [AccountId2], [RelationType]) VALUES (3, 5, 4, 1)
INSERT [dbo].[AccountRelation] ([Id], [AccountId1], [AccountId2], [RelationType]) VALUES (5, 11, 4, 1)
INSERT [dbo].[AccountRelation] ([Id], [AccountId1], [AccountId2], [RelationType]) VALUES (6, 10, 4, 1)
INSERT [dbo].[AccountRelation] ([Id], [AccountId1], [AccountId2], [RelationType]) VALUES (11, 8, 13, 1)
INSERT [dbo].[AccountRelation] ([Id], [AccountId1], [AccountId2], [RelationType]) VALUES (30, 13, 8, 1)
INSERT [dbo].[AccountRelation] ([Id], [AccountId1], [AccountId2], [RelationType]) VALUES (33, 5, 7, 1)
INSERT [dbo].[AccountRelation] ([Id], [AccountId1], [AccountId2], [RelationType]) VALUES (35, 7, 5, 1)
INSERT [dbo].[AccountRelation] ([Id], [AccountId1], [AccountId2], [RelationType]) VALUES (36, 13, 7, 1)
INSERT [dbo].[AccountRelation] ([Id], [AccountId1], [AccountId2], [RelationType]) VALUES (37, 7, 13, 1)
SET IDENTITY_INSERT [dbo].[AccountRelation] OFF
GO
SET IDENTITY_INSERT [dbo].[AccountRole] ON 

INSERT [dbo].[AccountRole] ([Id], [AccountId], [RoleId]) VALUES (1, 1, 1)
INSERT [dbo].[AccountRole] ([Id], [AccountId], [RoleId]) VALUES (2, 2, 2)
INSERT [dbo].[AccountRole] ([Id], [AccountId], [RoleId]) VALUES (3, 3, 2)
INSERT [dbo].[AccountRole] ([Id], [AccountId], [RoleId]) VALUES (4, 4, 2)
INSERT [dbo].[AccountRole] ([Id], [AccountId], [RoleId]) VALUES (5, 5, 2)
INSERT [dbo].[AccountRole] ([Id], [AccountId], [RoleId]) VALUES (6, 6, 2)
INSERT [dbo].[AccountRole] ([Id], [AccountId], [RoleId]) VALUES (7, 7, 2)
INSERT [dbo].[AccountRole] ([Id], [AccountId], [RoleId]) VALUES (8, 8, 2)
INSERT [dbo].[AccountRole] ([Id], [AccountId], [RoleId]) VALUES (9, 9, 2)
INSERT [dbo].[AccountRole] ([Id], [AccountId], [RoleId]) VALUES (10, 10, 2)
INSERT [dbo].[AccountRole] ([Id], [AccountId], [RoleId]) VALUES (11, 11, 2)
INSERT [dbo].[AccountRole] ([Id], [AccountId], [RoleId]) VALUES (12, 12, 2)
INSERT [dbo].[AccountRole] ([Id], [AccountId], [RoleId]) VALUES (13, 13, 2)
INSERT [dbo].[AccountRole] ([Id], [AccountId], [RoleId]) VALUES (14, 14, 2)
INSERT [dbo].[AccountRole] ([Id], [AccountId], [RoleId]) VALUES (15, 15, 2)
INSERT [dbo].[AccountRole] ([Id], [AccountId], [RoleId]) VALUES (16, 16, 2)
INSERT [dbo].[AccountRole] ([Id], [AccountId], [RoleId]) VALUES (17, 17, 2)
INSERT [dbo].[AccountRole] ([Id], [AccountId], [RoleId]) VALUES (18, 18, 2)
INSERT [dbo].[AccountRole] ([Id], [AccountId], [RoleId]) VALUES (19, 19, 1)
INSERT [dbo].[AccountRole] ([Id], [AccountId], [RoleId]) VALUES (20, 20, 2)
SET IDENTITY_INSERT [dbo].[AccountRole] OFF
GO
SET IDENTITY_INSERT [dbo].[AccountVoucher] ON 

INSERT [dbo].[AccountVoucher] ([Id], [AccountId], [VoucherId], [IsUsed]) VALUES (1, 5, 1, 0)
INSERT [dbo].[AccountVoucher] ([Id], [AccountId], [VoucherId], [IsUsed]) VALUES (2, 5, 2, 0)
INSERT [dbo].[AccountVoucher] ([Id], [AccountId], [VoucherId], [IsUsed]) VALUES (3, 5, 3, 0)
INSERT [dbo].[AccountVoucher] ([Id], [AccountId], [VoucherId], [IsUsed]) VALUES (4, 5, 4, 0)
INSERT [dbo].[AccountVoucher] ([Id], [AccountId], [VoucherId], [IsUsed]) VALUES (5, 5, 5, 1)
SET IDENTITY_INSERT [dbo].[AccountVoucher] OFF
GO
SET IDENTITY_INSERT [dbo].[Comment] ON 

INSERT [dbo].[Comment] ([Id], [AccountId], [PostId], [Content], [Time]) VALUES (14, 5, 78, N'Test comment for manager ', CAST(N'2021-04-11T17:47:55.933' AS DateTime))
INSERT [dbo].[Comment] ([Id], [AccountId], [PostId], [Content], [Time]) VALUES (15, 5, 78, N'Linh ca d?o này l?n nh? ', CAST(N'2021-04-11T17:48:25.323' AS DateTime))
INSERT [dbo].[Comment] ([Id], [AccountId], [PostId], [Content], [Time]) VALUES (16, 7, 85, N'Xin chào', CAST(N'2021-04-12T08:17:15.650' AS DateTime))
INSERT [dbo].[Comment] ([Id], [AccountId], [PostId], [Content], [Time]) VALUES (17, 7, 85, N'S?n ph?m này còn không?', CAST(N'2021-04-12T08:17:35.513' AS DateTime))
INSERT [dbo].[Comment] ([Id], [AccountId], [PostId], [Content], [Time]) VALUES (18, 7, 85, N'Tôi mu?n mua áo s? mi 3', CAST(N'2021-04-12T08:17:47.027' AS DateTime))
INSERT [dbo].[Comment] ([Id], [AccountId], [PostId], [Content], [Time]) VALUES (19, 7, 85, N'? vâng hãy ib ?? có thêm thông tin nhé!??', CAST(N'2021-04-12T09:23:16.787' AS DateTime))
INSERT [dbo].[Comment] ([Id], [AccountId], [PostId], [Content], [Time]) VALUES (20, 7, 85, N'Check ib nhé ??', CAST(N'2021-04-12T11:13:45.587' AS DateTime))
INSERT [dbo].[Comment] ([Id], [AccountId], [PostId], [Content], [Time]) VALUES (21, 13, 85, N'Ch?c ch?n r', CAST(N'2021-04-12T11:30:56.807' AS DateTime))
INSERT [dbo].[Comment] ([Id], [AccountId], [PostId], [Content], [Time]) VALUES (22, 13, 85, N'Tôi s? ki?m tra ngay', CAST(N'2021-04-12T11:31:07.260' AS DateTime))
INSERT [dbo].[Comment] ([Id], [AccountId], [PostId], [Content], [Time]) VALUES (23, 13, 85, N'Tôi s? ki?m tra ngay', CAST(N'2021-04-12T11:31:09.713' AS DateTime))
INSERT [dbo].[Comment] ([Id], [AccountId], [PostId], [Content], [Time]) VALUES (24, 13, 85, N'Làm ?n ??i chút nhé??', CAST(N'2021-04-12T11:31:22.700' AS DateTime))
INSERT [dbo].[Comment] ([Id], [AccountId], [PostId], [Content], [Time]) VALUES (25, 13, 85, N'Hình nh? tôi ch?a nh?n ???c tin nh?n', CAST(N'2021-04-12T11:34:51.890' AS DateTime))
INSERT [dbo].[Comment] ([Id], [AccountId], [PostId], [Content], [Time]) VALUES (26, 7, 85, N'Tôi s? ki?m tra l?i ngay', CAST(N'2021-04-12T11:38:52.807' AS DateTime))
INSERT [dbo].[Comment] ([Id], [AccountId], [PostId], [Content], [Time]) VALUES (27, 7, 85, N'Ki?m tra l?i nhé', CAST(N'2021-04-12T11:41:50.503' AS DateTime))
INSERT [dbo].[Comment] ([Id], [AccountId], [PostId], [Content], [Time]) VALUES (28, 7, 85, N'Xin chào', CAST(N'2021-04-12T11:45:15.083' AS DateTime))
INSERT [dbo].[Comment] ([Id], [AccountId], [PostId], [Content], [Time]) VALUES (29, 7, 85, N'Haizzz', CAST(N'2021-04-12T11:45:48.887' AS DateTime))
INSERT [dbo].[Comment] ([Id], [AccountId], [PostId], [Content], [Time]) VALUES (30, 13, 87, N'okeeee', CAST(N'2021-04-13T17:21:29.190' AS DateTime))
SET IDENTITY_INSERT [dbo].[Comment] OFF
GO
SET IDENTITY_INSERT [dbo].[Conversation] ON 

INSERT [dbo].[Conversation] ([Id], [TimeCreate], [TimeUpdate], [AccountId1], [AccountId2], [Account1Delete], [Account2Delete]) VALUES (1, CAST(N'2021-03-20' AS Date), CAST(N'2021-03-20' AS Date), 3, 4, 0, 0)
INSERT [dbo].[Conversation] ([Id], [TimeCreate], [TimeUpdate], [AccountId1], [AccountId2], [Account1Delete], [Account2Delete]) VALUES (2, CAST(N'2021-03-20' AS Date), CAST(N'2021-03-20' AS Date), 3, 5, 0, 0)
INSERT [dbo].[Conversation] ([Id], [TimeCreate], [TimeUpdate], [AccountId1], [AccountId2], [Account1Delete], [Account2Delete]) VALUES (3, CAST(N'2021-03-24' AS Date), CAST(N'2021-03-24' AS Date), 13, 12, 0, 0)
INSERT [dbo].[Conversation] ([Id], [TimeCreate], [TimeUpdate], [AccountId1], [AccountId2], [Account1Delete], [Account2Delete]) VALUES (4, CAST(N'2020-02-02' AS Date), CAST(N'2020-02-02' AS Date), 1, 2, 0, 0)
INSERT [dbo].[Conversation] ([Id], [TimeCreate], [TimeUpdate], [AccountId1], [AccountId2], [Account1Delete], [Account2Delete]) VALUES (5, CAST(N'2021-03-27' AS Date), CAST(N'2021-03-27' AS Date), 7, 13, 0, 0)
INSERT [dbo].[Conversation] ([Id], [TimeCreate], [TimeUpdate], [AccountId1], [AccountId2], [Account1Delete], [Account2Delete]) VALUES (23, CAST(N'2021-03-28' AS Date), CAST(N'2021-03-28' AS Date), 1, 7, 0, 0)
INSERT [dbo].[Conversation] ([Id], [TimeCreate], [TimeUpdate], [AccountId1], [AccountId2], [Account1Delete], [Account2Delete]) VALUES (24, CAST(N'2021-04-04' AS Date), CAST(N'2021-04-04' AS Date), 8, 7, 0, 0)
INSERT [dbo].[Conversation] ([Id], [TimeCreate], [TimeUpdate], [AccountId1], [AccountId2], [Account1Delete], [Account2Delete]) VALUES (25, CAST(N'2021-04-06' AS Date), CAST(N'2021-04-06' AS Date), 18, 7, 0, 0)
INSERT [dbo].[Conversation] ([Id], [TimeCreate], [TimeUpdate], [AccountId1], [AccountId2], [Account1Delete], [Account2Delete]) VALUES (26, CAST(N'2021-04-06' AS Date), CAST(N'2021-04-06' AS Date), 12, 7, 0, 0)
INSERT [dbo].[Conversation] ([Id], [TimeCreate], [TimeUpdate], [AccountId1], [AccountId2], [Account1Delete], [Account2Delete]) VALUES (27, CAST(N'2021-04-06' AS Date), CAST(N'2021-04-06' AS Date), 17, 7, 0, 0)
INSERT [dbo].[Conversation] ([Id], [TimeCreate], [TimeUpdate], [AccountId1], [AccountId2], [Account1Delete], [Account2Delete]) VALUES (28, CAST(N'2021-04-12' AS Date), CAST(N'2021-04-12' AS Date), 19, 7, 0, 0)
SET IDENTITY_INSERT [dbo].[Conversation] OFF
GO
SET IDENTITY_INSERT [dbo].[Feedback] ON 

INSERT [dbo].[Feedback] ([Id], [Title], [Content], [UserFeedbackId], [LastUpdated], [Status]) VALUES (7, N'Demo 1', N'Test feeeback', 13, CAST(N'2021-04-13T15:35:26.013' AS DateTime), 1)
INSERT [dbo].[Feedback] ([Id], [Title], [Content], [UserFeedbackId], [LastUpdated], [Status]) VALUES (8, N'1', N'2', 13, CAST(N'2021-04-13T15:56:01.463' AS DateTime), 2)
INSERT [dbo].[Feedback] ([Id], [Title], [Content], [UserFeedbackId], [LastUpdated], [Status]) VALUES (11, N'Test', N'Alo alo', 12, CAST(N'2021-04-09T04:30:52.427' AS DateTime), 1)
INSERT [dbo].[Feedback] ([Id], [Title], [Content], [UserFeedbackId], [LastUpdated], [Status]) VALUES (12, N'123', N'123', 13, CAST(N'2021-04-13T15:38:12.723' AS DateTime), 1)
INSERT [dbo].[Feedback] ([Id], [Title], [Content], [UserFeedbackId], [LastUpdated], [Status]) VALUES (13, N'2', N'2', 13, CAST(N'2021-04-10T10:59:19.677' AS DateTime), 1)
INSERT [dbo].[Feedback] ([Id], [Title], [Content], [UserFeedbackId], [LastUpdated], [Status]) VALUES (14, N'?ây là m?t cái title r?t dài vì tao mu?n test cái substring c?a title xem có ho?t ??ng ???c hay không', N'Qw', 13, CAST(N'2021-04-13T15:54:39.147' AS DateTime), 2)
INSERT [dbo].[Feedback] ([Id], [Title], [Content], [UserFeedbackId], [LastUpdated], [Status]) VALUES (15, N'Feedback c?a ny D?ng', N'App x?u vl :(
', 13, CAST(N'2021-04-13T15:57:47.810' AS DateTime), 2)
SET IDENTITY_INSERT [dbo].[Feedback] OFF
GO
SET IDENTITY_INSERT [dbo].[Image] ON 

INSERT [dbo].[Image] ([Id], [PostId], [Url]) VALUES (69, 78, N'VienMV\post_image\78_69.png')
INSERT [dbo].[Image] ([Id], [PostId], [Url]) VALUES (75, 84, N'VienMV\post_image\84_75.png')
INSERT [dbo].[Image] ([Id], [PostId], [Url]) VALUES (76, 84, N'VienMV\post_image\84_76.png')
INSERT [dbo].[Image] ([Id], [PostId], [Url]) VALUES (77, 84, N'VienMV\post_image\84_77.png')
INSERT [dbo].[Image] ([Id], [PostId], [Url]) VALUES (78, 85, N'VienMV\post_image\85_78.png')
INSERT [dbo].[Image] ([Id], [PostId], [Url]) VALUES (79, 85, N'VienMV\post_image\85_79.png')
INSERT [dbo].[Image] ([Id], [PostId], [Url]) VALUES (80, 85, N'VienMV\post_image\85_80.png')
INSERT [dbo].[Image] ([Id], [PostId], [Url]) VALUES (82, 87, N'VienMV\post_image\87_82.png')
SET IDENTITY_INSERT [dbo].[Image] OFF
GO
SET IDENTITY_INSERT [dbo].[Info] ON 

INSERT [dbo].[Info] ([Id], [height], [weight], [AccountId], [BustSize], [WaistSize], [HipSize], [SkinColor], [name]) VALUES (11, 160, 40, 7, 90, 56, 97, 0, N'H?i còn g?y ')
INSERT [dbo].[Info] ([Id], [height], [weight], [AccountId], [BustSize], [WaistSize], [HipSize], [SkinColor], [name]) VALUES (12, 169, 67, 13, 0, 0, 0, 0, N'Body D?ng')
SET IDENTITY_INSERT [dbo].[Info] OFF
GO
SET IDENTITY_INSERT [dbo].[Like] ON 

INSERT [dbo].[Like] ([Id], [PostId], [AccountLike]) VALUES (84, 0, 7)
INSERT [dbo].[Like] ([Id], [PostId], [AccountLike]) VALUES (87, 0, 7)
INSERT [dbo].[Like] ([Id], [PostId], [AccountLike]) VALUES (311, 2, 7)
INSERT [dbo].[Like] ([Id], [PostId], [AccountLike]) VALUES (312, 3, 7)
INSERT [dbo].[Like] ([Id], [PostId], [AccountLike]) VALUES (322, 78, 7)
INSERT [dbo].[Like] ([Id], [PostId], [AccountLike]) VALUES (323, 84, 7)
INSERT [dbo].[Like] ([Id], [PostId], [AccountLike]) VALUES (324, 84, 13)
INSERT [dbo].[Like] ([Id], [PostId], [AccountLike]) VALUES (329, 85, 13)
SET IDENTITY_INSERT [dbo].[Like] OFF
GO
SET IDENTITY_INSERT [dbo].[MailContent] ON 

INSERT [dbo].[MailContent] ([ID], [Code], [Subject], [Content]) VALUES (1, N'SEND_MAIL_OTP', N'SOFA - MÃ XÁC TH?C', N'<b>Xin chào @lastname</b>
    <p>Chúng tôi nh?n ???c yêu c?u cung c?p mã xác th?c cho tài kho?n SOFA c?a b?n</p>
    <p>D??i ?ây là mã xác th?c cho giao d?ch. Mã xác th?c s? h?t h?n sau 60 giây. ?? ??m b?o an toàn, vui lòng không cung c?p mã xác th?c cho b?t k? ai khác.</p>
    <p>Mã xác th?c c?a b?n là: <b>@otp</b> </p>
    <p>Chúc b?n m?t ngày t?t lành</p>')
INSERT [dbo].[MailContent] ([ID], [Code], [Subject], [Content]) VALUES (2, N'SEND_SMS_OTP', N'SOFA - Mã xác th?c', N'Hello @lastname
This is your verification code: @otp
This code will expire after 60 seconds.
Please, never give this code to anyone.
Thanks.')
SET IDENTITY_INSERT [dbo].[MailContent] OFF
GO
SET IDENTITY_INSERT [dbo].[Message] ON 

INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (1, 3, 4, N'test1', 0, 0, 1, 1, CAST(N'2021-03-20T00:00:00.000' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (2, 4, 3, N'test2', 0, 0, 1, 1, CAST(N'2021-03-20T00:00:00.000' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (3, 3, 5, N'test3', 0, 0, 1, 2, CAST(N'2021-03-20T00:00:00.000' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (4, 3, 4, N't', 0, 0, 1, 1, CAST(N'2021-03-20T00:00:00.000' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (5, 3, 4, N't', 0, 0, 1, 1, CAST(N'2021-03-20T00:00:00.000' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (6, 3, 4, N'test5', 0, 0, 1, 1, CAST(N'2021-03-20T00:00:00.000' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (7, 3, 4, N'test6', 0, 0, 1, 1, CAST(N'2021-03-20T00:00:00.000' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (8, 3, 4, N'test6', 0, 0, 1, 1, CAST(N'2021-03-20T00:00:00.000' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (9, 3, 4, N'test7', 0, 0, 1, 1, CAST(N'2021-03-20T00:00:00.000' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (10, 3, 4, N'test8', 0, 0, 1, 1, CAST(N'2021-03-23T14:45:04.787' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (11, 3, 4, N'test9', 0, 0, 1, 1, CAST(N'2021-03-23T22:08:29.417' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (12, 3, 4, N'test9', 0, 0, 1, 1, CAST(N'2021-03-23T22:14:47.283' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (13, 3, 4, N'test9', 0, 0, 1, 1, CAST(N'2021-03-23T22:14:47.283' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (14, 3, 4, N'test9', 0, 0, 1, 1, CAST(N'2021-03-23T22:15:47.857' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (15, 3, 4, N'test9', 0, 0, 1, 1, CAST(N'2021-03-23T22:16:03.313' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (16, 3, 4, N'test10', 0, 0, 1, 1, CAST(N'2021-03-23T22:19:18.447' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (17, 3, 4, N'test11', 0, 0, 1, 1, CAST(N'2021-03-23T22:27:35.600' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (18, 3, 4, N'test12', 0, 0, 1, 1, CAST(N'2021-03-23T22:29:11.663' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (19, 3, 4, N'test13', 0, 0, 1, 1, CAST(N'2021-03-23T22:48:01.633' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (20, 13, 12, N'?ây là tin nh?n th? 2', 0, 0, 0, 4, CAST(N'2021-03-24T00:00:00.000' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (21, 12, 13, N'Chào, ?ây là tin nh?n th? 3', 0, 0, 0, 4, CAST(N'2021-03-25T00:00:00.000' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (22, 13, 12, N'Hì, ?ây là tin nh?n ??u tiên', 0, 0, 0, 4, CAST(N'2021-03-23T17:24:23.160' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (23, 13, 12, N'?ây là tin nh?n có ?nh', 0, 0, 0, 4, CAST(N'2021-03-24T09:18:15.267' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (24, 12, 13, N'?ây là tin nh?n có ?nh th? 2', 0, 0, 0, 4, CAST(N'2021-03-24T09:49:41.463' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (25, 13, 12, N'?ây là tin nh?n có ?nh th? 3', 0, 0, 0, 4, CAST(N'2021-03-24T10:04:44.817' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (26, 12, 13, N'?ây là tin nh?n có ?nh th? 4', 0, 0, 0, 4, CAST(N'2021-03-24T14:00:51.630' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (27, 13, 12, N'?ây là tin nh?n có ?nh th? 5', 0, 0, 0, 4, CAST(N'2021-03-24T14:06:03.273' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (28, 13, 12, N'123', 0, 0, 0, 4, CAST(N'2021-03-24T15:12:55.680' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (29, 13, 12, N'undefined', 0, 0, 0, 4, CAST(N'2021-03-24T16:29:00.470' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (30, 13, 12, N'Fc', 0, 0, 0, 4, CAST(N'2021-03-24T16:32:05.123' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (31, 13, 12, N'123', 0, 0, 0, 4, CAST(N'2021-03-26T04:27:10.370' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (32, 12, 13, N'', 0, 0, 1, 4, CAST(N'2021-03-26T00:00:00.000' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (33, 13, 12, N'', 0, 0, 1, 4, CAST(N'2021-03-26T11:58:40.313' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (34, 13, 12, N'', 0, 0, 0, 4, CAST(N'2021-03-26T05:14:02.917' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (35, 13, 12, N'Abc', 0, 0, 0, 4, CAST(N'2021-03-26T17:15:40.117' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (36, 13, 12, N'123', 0, 0, 0, 4, CAST(N'2021-03-27T04:18:29.080' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (37, 13, 12, N'', 0, 0, 0, 4, CAST(N'2021-03-27T04:25:07.503' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (38, 13, 12, N'', 0, 0, 0, 4, CAST(N'2021-03-27T04:25:27.610' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (39, 13, 12, N'Test', 0, 0, 0, 4, CAST(N'2021-03-27T11:35:28.023' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (40, 18, 13, N'Alo', 0, 0, 0, 4, CAST(N'2021-03-27T11:51:35.363' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (41, 13, 18, N'123', 0, 0, 0, 4, CAST(N'2021-03-27T11:51:50.433' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (42, 13, 18, N'', 0, 0, 0, 4, CAST(N'2021-03-27T11:52:00.670' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (43, 18, 13, N'', 0, 0, 0, 4, CAST(N'2021-03-27T11:52:07.223' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (45, 13, 18, N'Ryu', 0, 0, 0, 4, CAST(N'2021-03-27T14:42:03.740' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (46, 13, 18, N'Uh', 0, 0, 0, 4, CAST(N'2021-03-28T02:20:14.183' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (48, 13, 18, N'?', 0, 0, 0, 4, CAST(N'2021-03-28T02:30:53.910' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (61, 13, 18, N'Brhrhrurj', 0, 0, 0, 4, CAST(N'2021-03-28T02:57:55.607' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (72, 13, 18, N'111', 0, 0, 0, 4, CAST(N'2021-03-28T05:44:36.907' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (92, 13, 7, N'123', 0, 1, 0, 5, CAST(N'2021-03-28T15:55:00.530' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (93, 13, 7, N'', 1, 1, 0, 5, CAST(N'2021-03-28T15:55:30.203' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (94, 13, 7, N'Ted', 0, 1, 0, 5, CAST(N'2021-03-28T16:11:19.660' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (95, 13, 7, N'', 0, 1, 0, 5, CAST(N'2021-03-28T16:11:30.440' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (96, 13, 7, N'?mm', 0, 1, 0, 5, CAST(N'2021-03-29T02:21:41.167' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (97, 7, 1, N'abc', 1, 0, 0, 23, CAST(N'2021-03-29T00:00:00.000' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (98, 7, 1, N'Hello', 0, 0, 0, 23, CAST(N'2021-03-31T18:09:01.537' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (99, 1, 7, N'Vdhdhd', 0, 0, 0, 23, CAST(N'2021-04-01T20:25:24.100' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (100, 7, 1, N'abc', 1, 0, 0, 23, CAST(N'2021-04-01T20:29:59.987' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (101, 13, 7, N'Hellooo', 0, 1, 0, 5, CAST(N'2021-04-02T03:31:37.237' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (102, 0, 13, N'Oke con dê', 0, 0, 0, 5, CAST(N'2021-04-03T01:45:40.653' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (103, 0, 13, N'Oke con dê', 0, 0, 0, 5, CAST(N'2021-04-03T01:47:50.443' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (104, 0, 13, N'Oke con dê', 0, 0, 0, 5, CAST(N'2021-04-03T01:53:53.217' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (105, 7, 13, N'Oke con dê', 1, 1, 0, 5, CAST(N'2021-04-03T01:57:46.243' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (106, 7, 13, N'Oke con dê', 1, 1, 0, 5, CAST(N'2021-04-03T01:59:33.163' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (107, 7, 13, N'Oke con dê', 1, 1, 0, 5, CAST(N'2021-04-03T01:59:49.343' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (108, 7, 13, N'Oke con dê', 1, 1, 0, 5, CAST(N'2021-04-03T02:01:18.970' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (109, 7, 13, N'Oke con dê', 1, 1, 0, 5, CAST(N'2021-04-03T02:05:27.863' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (110, 7, 13, N'Oke con dê', 1, 1, 0, 5, CAST(N'2021-04-03T02:05:39.697' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (111, 7, 13, N'Oke con dê', 1, 1, 0, 5, CAST(N'2021-04-03T02:05:43.563' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (112, 7, 13, N'Oke con dê', 1, 1, 0, 5, CAST(N'2021-04-03T02:05:45.547' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (113, 7, 13, N'Oke con dê', 1, 1, 0, 5, CAST(N'2021-04-03T02:05:46.943' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (114, 7, 13, N'Oke con dê', 1, 1, 0, 5, CAST(N'2021-04-03T02:05:48.333' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (115, 7, 13, N'Oke con dê', 1, 1, 0, 5, CAST(N'2021-04-03T02:05:49.277' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (116, 7, 13, N'Oke con dê', 1, 1, 0, 5, CAST(N'2021-04-03T02:06:58.297' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (117, 7, 13, N'Oke con dê', 1, 1, 0, 5, CAST(N'2021-04-03T02:07:08.187' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (118, 7, 13, N'Oke con dê', 1, 1, 0, 5, CAST(N'2021-04-03T02:07:28.167' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (119, 7, 13, N'Oke con dê', 1, 1, 0, 5, CAST(N'2021-04-03T02:07:36.777' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (120, 7, 13, N'Oke con dê', 1, 1, 0, 5, CAST(N'2021-04-03T02:07:42.113' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (121, 7, 1, N'Hello', 1, 0, 0, 23, CAST(N'2021-04-04T15:29:50.020' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (122, 7, 13, N'Abc', 1, 0, 0, 5, CAST(N'2021-04-04T15:32:37.853' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (123, 7, 1, N'Love you', 1, 0, 0, 23, CAST(N'2021-04-04T15:33:09.593' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (124, 7, 13, N'Abcdes', 1, 0, 0, 5, CAST(N'2021-04-04T15:33:25.450' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (125, 7, 1, N'Qw3', 1, 0, 0, 23, CAST(N'2021-04-04T15:40:12.813' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (126, 7, 13, N'123', 1, 0, 0, 5, CAST(N'2021-04-04T22:56:05.793' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (127, 7, 1, N'1', 1, 0, 0, 23, CAST(N'2021-04-04T22:56:28.297' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (128, 7, 8, N'123', 1, 0, 0, 24, CAST(N'2021-04-04T23:16:26.703' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (129, 7, 8, N'32', 1, 0, 0, 24, CAST(N'2021-04-04T17:05:55.373' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (130, 7, 8, N'Abc', 1, 0, 0, 24, CAST(N'2021-04-06T16:29:16.423' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (131, 7, 18, N'abc', 1, 0, 0, 25, CAST(N'2021-04-06T16:30:45.443' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (132, 7, 12, N'test', 1, 0, 0, 26, CAST(N'2021-04-06T16:37:24.960' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (133, 7, 1, N'W', 1, 0, 0, 23, CAST(N'2021-04-06T09:59:37.263' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (134, 7, 17, N'abc', 1, 0, 0, 27, CAST(N'2021-04-06T10:00:03.687' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (135, 7, 13, N'Alooo', 1, 0, 0, 5, CAST(N'2021-04-06T10:00:21.567' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (136, 7, 13, N'Eee', 1, 0, 0, 5, CAST(N'2021-04-06T10:00:41.243' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (137, 13, 7, N'Aloo', 0, 1, 0, 5, CAST(N'2021-04-06T10:01:09.500' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (138, 7, 13, N'nghe', 1, 0, 0, 5, CAST(N'2021-04-06T10:01:28.883' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (139, 7, 13, N'ai day nhi', 1, 0, 0, 5, CAST(N'2021-04-06T10:02:15.970' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (140, 7, 13, N'1', 1, 0, 0, 5, CAST(N'2021-04-06T10:06:16.283' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (141, 7, 13, N'W', 1, 0, 0, 5, CAST(N'2021-04-06T10:31:59.433' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (142, 7, 8, N'cde', 1, 0, 0, 24, CAST(N'2021-04-06T10:38:18.357' AS DateTime))
GO
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (143, 7, 8, N'cde', 1, 0, 0, 24, CAST(N'2021-04-06T10:47:37.127' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (144, 7, 13, N'Aloo', 1, 0, 0, 5, CAST(N'2021-04-11T16:43:57.007' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (145, 7, 18, N'Q', 1, 0, 0, 25, CAST(N'2021-04-12T07:30:01.750' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (146, 7, 12, N'1', 1, 0, 0, 26, CAST(N'2021-04-12T07:33:31.777' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (147, 7, 1, N'a', 0, 0, 0, 23, CAST(N'2021-04-12T07:49:53.887' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (148, 7, 13, N'a', 0, 0, 0, 5, CAST(N'2021-04-12T07:50:01.910' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (149, 7, 19, N'1', 1, 0, 0, 28, CAST(N'2021-04-12T08:20:11.513' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (150, 7, 19, N'1', 1, 0, 0, 28, CAST(N'2021-04-12T08:23:54.433' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (151, 7, 19, N'1', 1, 0, 0, 28, CAST(N'2021-04-12T08:24:42.510' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (152, 13, 7, N'?mm', 0, 0, 0, 5, CAST(N'2021-04-13T02:23:14.187' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (153, 13, 7, N'Sg', 0, 0, 0, 5, CAST(N'2021-04-13T02:23:56.760' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (154, 7, 13, N'Gg', 0, 0, 0, 5, CAST(N'2021-04-13T02:24:15.367' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (155, 13, 7, N'Okeee', 0, 0, 0, 5, CAST(N'2021-04-13T15:59:53.167' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (156, 13, 7, N'okeee', 0, 0, 0, 5, CAST(N'2021-04-13T17:22:18.237' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (157, 7, 13, N'H?', 0, 0, 0, 5, CAST(N'2021-04-13T17:22:38.560' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (158, 13, 7, N'kcg', 0, 0, 0, 5, CAST(N'2021-04-13T17:22:46.353' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (159, 7, 13, N'??', 0, 0, 0, 5, CAST(N'2021-04-13T17:22:49.187' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (160, 7, 13, N'Okeee', 0, 0, 0, 5, CAST(N'2021-04-14T02:07:32.727' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (161, 7, 13, N'Vienmv ', 1, 0, 0, 5, CAST(N'2021-04-14T02:07:41.527' AS DateTime))
INSERT [dbo].[Message] ([Id], [FromAccountId], [ToAccountId], [Content], [SenderDeleted], [ReceiverDeleted], [IsRead], [ConversationId], [Time]) VALUES (162, 7, 13, N'J', 0, 0, 0, 5, CAST(N'2021-04-14T02:14:52.837' AS DateTime))
SET IDENTITY_INSERT [dbo].[Message] OFF
GO
SET IDENTITY_INSERT [dbo].[MessageImage] ON 

INSERT [dbo].[MessageImage] ([Id], [MessageId], [Url]) VALUES (42, 85, N'message/0/2021-03-28-14-59-09-686.png')
INSERT [dbo].[MessageImage] ([Id], [MessageId], [Url]) VALUES (43, 86, N'message/0/2021-03-28-14-59-46-316.png')
INSERT [dbo].[MessageImage] ([Id], [MessageId], [Url]) VALUES (44, 93, N'message/5/2021-03-28-15-55-30-202.png')
INSERT [dbo].[MessageImage] ([Id], [MessageId], [Url]) VALUES (45, 95, N'message/5/2021-03-28-16-11-30-439.png')
INSERT [dbo].[MessageImage] ([Id], [MessageId], [Url]) VALUES (46, 100, N'message/0/2021-04-01-20-29-59-985.png')
SET IDENTITY_INSERT [dbo].[MessageImage] OFF
GO
SET IDENTITY_INSERT [dbo].[Notification] ON 

INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (35, 1, NULL, 1, 68, N'?ã thích bài ??ng c?a b?n', 7, 7, CAST(N'2021-03-29T09:37:12.713' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (36, 1, NULL, 1, 68, N'?ã thích bài ??ng c?a b?n', 7, 7, CAST(N'2021-03-29T09:40:14.417' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (37, 1, NULL, 1, 68, N'?ã thích bài ??ng c?a b?n', 7, 7, CAST(N'2021-03-29T09:41:15.890' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (38, 3, NULL, 1, 68, N'?ã ?ánh giá bài ??ng c?a b?n', 7, 7, CAST(N'2021-03-29T09:43:16.587' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (39, 3, NULL, 1, 68, N'?ã ?ánh giá bài ??ng c?a b?n', 7, 7, CAST(N'2021-03-29T09:43:18.707' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (40, 3, NULL, 1, 68, N'?ã ?ánh giá bài ??ng c?a b?n', 7, 7, CAST(N'2021-03-29T09:43:22.083' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (41, 3, NULL, 1, 68, N'?ã ?ánh giá bài ??ng c?a b?n', 7, 7, CAST(N'2021-03-29T09:43:24.663' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (42, 3, NULL, 1, 68, N'?ã ?ánh giá bài ??ng c?a b?n', 7, 7, CAST(N'2021-03-29T09:43:25.827' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (43, 3, NULL, 1, 68, N'?ã ?ánh giá bài ??ng c?a b?n', 7, 7, CAST(N'2021-03-29T09:43:27.193' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (44, 3, NULL, 1, 68, N'?ã ?ánh giá bài ??ng c?a b?n', 7, 7, CAST(N'2021-03-29T09:43:28.573' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (45, 1, NULL, 1, 68, N'?ã thích bài ??ng c?a b?n', 7, 7, CAST(N'2021-03-29T14:53:21.360' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (46, 1, NULL, 1, 64, N'?ã thích bài ??ng c?a b?n', 7, 7, CAST(N'2021-03-29T16:17:23.907' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (47, 1, NULL, 1, 68, N'?ã thích bài ??ng c?a b?n', 7, 7, CAST(N'2021-03-29T17:40:11.090' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (48, 3, NULL, 1, 68, N'?ã ?ánh giá bài ??ng c?a b?n', 7, 7, CAST(N'2021-03-30T02:15:52.060' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (49, 2, NULL, 1, 68, N'?ã bình lu?n v? bài ??ng c?a b?n', 7, 7, CAST(N'2021-03-30T02:33:45.083' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (50, 2, NULL, 1, 68, N'?ã bình lu?n v? bài ??ng c?a b?n', 7, 7, CAST(N'2021-03-30T02:36:19.100' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (51, 1, NULL, 1, 68, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-03-30T02:38:15.127' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (52, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 7, 7, CAST(N'2021-03-30T03:05:20.737' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (53, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 7, 7, CAST(N'2021-03-30T03:09:40.737' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (54, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 7, 7, CAST(N'2021-03-30T03:09:52.283' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (55, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 7, 7, CAST(N'2021-03-30T03:10:27.213' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (56, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 7, 7, CAST(N'2021-03-30T03:10:49.480' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (57, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 7, 7, CAST(N'2021-03-30T03:10:51.420' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (58, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 7, 7, CAST(N'2021-03-30T03:10:55.100' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (59, 1, NULL, 1, 62, N'?ã thích bài ??ng c?a b?n', 7, 13, CAST(N'2021-03-30T03:11:20.000' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (60, 1, NULL, 1, 62, N'?ã thích bài ??ng c?a b?n', 7, 13, CAST(N'2021-03-30T03:11:51.097' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (61, 1, NULL, 1, 62, N'?ã thích bài ??ng c?a b?n', 7, 13, CAST(N'2021-03-30T03:11:53.543' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (62, 1, NULL, 1, 62, N'?ã thích bài ??ng c?a b?n', 7, 13, CAST(N'2021-03-30T03:11:55.400' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (63, 1, NULL, 1, 62, N'?ã thích bài ??ng c?a b?n', 7, 13, CAST(N'2021-03-30T03:11:56.950' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (64, 1, NULL, 1, 62, N'?ã thích bài ??ng c?a b?n', 7, 13, CAST(N'2021-03-30T03:11:58.587' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (65, 1, NULL, 1, 62, N'?ã thích bài ??ng c?a b?n', 7, 13, CAST(N'2021-03-30T03:12:00.340' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (66, 1, NULL, 1, 62, N'?ã thích bài ??ng c?a b?n', 7, 13, CAST(N'2021-03-30T03:12:02.157' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (67, 1, NULL, 1, 62, N'?ã thích bài ??ng c?a b?n', 7, 13, CAST(N'2021-03-30T03:12:03.883' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (68, 1, NULL, 1, 62, N'?ã thích bài ??ng c?a b?n', 7, 13, CAST(N'2021-03-30T03:12:05.387' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (69, 1, NULL, 1, 62, N'?ã thích bài ??ng c?a b?n', 7, 13, CAST(N'2021-03-30T03:12:06.750' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (70, 1, NULL, 1, 62, N'?ã thích bài ??ng c?a b?n', 7, 13, CAST(N'2021-03-30T03:12:08.307' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (71, 2, NULL, 1, 70, N'?ã bình lu?n v? bài ??ng c?a b?n', 7, 7, CAST(N'2021-03-30T03:13:38.647' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (72, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 7, 7, CAST(N'2021-03-30T03:13:46.753' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (73, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 7, 7, CAST(N'2021-03-30T03:16:23.720' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (74, 1, NULL, 1, 64, N'?ã thích bài ??ng c?a b?n', 7, 7, CAST(N'2021-03-30T03:16:30.143' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (75, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 7, 7, CAST(N'2021-03-30T07:34:08.623' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (76, 2, NULL, 1, 70, N'?ã bình lu?n v? bài ??ng c?a b?n', 7, 7, CAST(N'2021-03-30T07:34:33.933' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (77, 2, NULL, 1, 70, N'?ã bình lu?n v? bài ??ng c?a b?n', 7, 7, CAST(N'2021-03-30T07:34:40.073' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (78, 2, NULL, 1, 70, N'?ã bình lu?n v? bài ??ng c?a b?n', 7, 7, CAST(N'2021-03-30T07:34:44.527' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (79, 1, NULL, 1, 62, N'?ã thích bài ??ng c?a b?n', 7, 13, CAST(N'2021-03-30T07:38:12.423' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (80, 1, NULL, 1, 61, N'?ã thích bài ??ng c?a b?n', 7, 13, CAST(N'2021-03-30T07:43:20.283' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (81, 1, NULL, 1, 62, N'?ã thích bài ??ng c?a b?n', 7, 13, CAST(N'2021-03-30T07:44:03.643' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (82, 1, NULL, 1, 62, N'?ã thích bài ??ng c?a b?n', 7, 13, CAST(N'2021-03-30T07:56:18.193' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (83, 1, NULL, 1, 62, N'?ã thích bài ??ng c?a b?n', 7, 13, CAST(N'2021-03-30T07:59:39.400' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (84, 1, NULL, 1, 62, N'?ã thích bài ??ng c?a b?n', 7, 13, CAST(N'2021-03-30T07:59:41.920' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (85, 1, NULL, 1, 62, N'?ã thích bài ??ng c?a b?n', 7, 13, CAST(N'2021-03-30T08:01:47.517' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (86, 1, NULL, 1, 62, N'?ã thích bài ??ng c?a b?n', 7, 13, CAST(N'2021-03-30T08:06:08.367' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (87, 1, NULL, 1, 62, N'?ã thích bài ??ng c?a b?n', 7, 13, CAST(N'2021-03-30T08:06:12.297' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (88, 1, NULL, 1, 62, N'?ã thích bài ??ng c?a b?n', 7, 13, CAST(N'2021-03-30T08:08:35.017' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (89, 1, NULL, 1, 62, N'?ã thích bài ??ng c?a b?n', 7, 13, CAST(N'2021-03-30T08:08:37.160' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (90, 1, NULL, 1, 64, N'?ã thích bài ??ng c?a b?n', 7, 7, CAST(N'2021-03-30T08:12:26.707' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (91, 1, NULL, 1, 64, N'?ã thích bài ??ng c?a b?n', 7, 7, CAST(N'2021-03-30T08:12:29.713' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (92, 1, NULL, 1, 60, N'?ã thích bài ??ng c?a b?n', 7, 13, CAST(N'2021-03-30T08:12:38.123' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (93, 1, NULL, 1, 60, N'?ã thích bài ??ng c?a b?n', 7, 13, CAST(N'2021-03-30T08:12:40.490' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (94, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-03-30T09:38:32.357' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (95, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-03-30T09:39:36.443' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (96, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-03-30T09:39:50.270' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (97, 1, NULL, 1, 64, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-03-30T09:39:55.490' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (98, 1, NULL, 1, 64, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-03-30T09:48:21.483' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (99, 1, NULL, 1, 62, N'?ã thích bài ??ng c?a b?n', 7, 13, CAST(N'2021-03-30T09:48:31.653' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (100, 1, NULL, 1, 61, N'?ã thích bài ??ng c?a b?n', 7, 13, CAST(N'2021-03-30T09:48:52.977' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (101, 1, NULL, 1, 61, N'?ã thích bài ??ng c?a b?n', 7, 13, CAST(N'2021-03-30T09:49:19.023' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (102, 1, NULL, 1, 61, N'?ã thích bài ??ng c?a b?n', 7, 13, CAST(N'2021-03-30T09:49:23.993' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (103, 1, NULL, 1, 61, N'?ã thích bài ??ng c?a b?n', 7, 13, CAST(N'2021-03-30T09:49:30.900' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (104, 1, NULL, 1, 61, N'?ã thích bài ??ng c?a b?n', 7, 13, CAST(N'2021-03-30T09:49:35.550' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (105, 1, NULL, 1, 61, N'?ã thích bài ??ng c?a b?n', 7, 13, CAST(N'2021-03-30T09:50:01.287' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (106, 1, NULL, 1, 61, N'?ã thích bài ??ng c?a b?n', 7, 13, CAST(N'2021-03-30T09:50:10.003' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (107, 1, NULL, 1, 61, N'?ã thích bài ??ng c?a b?n', 7, 13, CAST(N'2021-03-30T09:50:14.837' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (108, 1, NULL, 1, 61, N'?ã thích bài ??ng c?a b?n', 7, 13, CAST(N'2021-03-30T09:50:19.180' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (109, 1, NULL, 1, 61, N'?ã thích bài ??ng c?a b?n', 7, 13, CAST(N'2021-03-30T09:51:00.363' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (110, 1, NULL, 1, 61, N'?ã thích bài ??ng c?a b?n', 7, 13, CAST(N'2021-03-30T09:55:44.737' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (111, 1, NULL, 1, 61, N'?ã thích bài ??ng c?a b?n', 7, 13, CAST(N'2021-03-30T09:55:53.340' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (112, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-03-30T09:57:13.293' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (113, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-03-30T09:59:15.700' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (114, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-03-30T09:59:25.713' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (115, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-03-30T09:59:39.923' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (116, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-03-30T09:59:43.760' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (117, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-03-30T10:00:35.497' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (118, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-03-30T10:01:35.380' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (119, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-03-30T10:01:40.793' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (120, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-03-30T10:01:46.380' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (121, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-03-30T10:01:50.400' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (122, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-03-31T07:46:08.520' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (123, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-03-31T07:46:31.997' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (124, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-03-31T07:46:40.637' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (125, 1, NULL, 1, 62, N'?ã thích bài ??ng c?a b?n', 7, 13, CAST(N'2021-03-31T08:15:48.690' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (126, 1, NULL, 1, 62, N'?ã thích bài ??ng c?a b?n', 7, 13, CAST(N'2021-03-31T08:17:46.507' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (127, 1, NULL, 1, 62, N'?ã thích bài ??ng c?a b?n', 7, 13, CAST(N'2021-03-31T08:17:59.343' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (128, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-03-31T08:35:51.027' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (129, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-03-31T08:36:03.737' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (130, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-03-31T08:36:39.373' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (131, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-03-31T08:36:52.223' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (132, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-03-31T08:37:12.003' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (133, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-03-31T08:38:32.203' AS DateTime))
GO
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (134, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-03-31T08:43:36.883' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (135, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-03-31T08:43:48.473' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (136, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-03-31T08:47:29.387' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (137, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-03-31T08:48:44.550' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (138, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-03-31T09:09:13.193' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (139, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-03-31T09:09:31.070' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (140, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-03-31T09:11:24.557' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (141, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-03-31T09:11:39.037' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (142, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-03-31T09:16:07.687' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (143, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-03-31T09:16:19.960' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (144, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-03-31T09:16:36.383' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (145, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-03-31T09:17:22.377' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (146, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-03-31T09:17:53.087' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (147, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-03-31T09:18:49.210' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (148, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-03-31T09:18:56.310' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (149, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-03-31T09:19:09.280' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (150, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-03-31T09:35:01.260' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (151, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-03-31T09:35:30.733' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (152, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-03-31T09:38:44.537' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (153, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-03-31T09:38:59.970' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (154, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-03-31T09:40:45.157' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (155, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-03-31T09:45:34.520' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (157, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-03-31T09:46:14.557' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (162, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-03-31T09:54:44.533' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (163, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-03-31T09:55:04.610' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (165, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-03-31T09:55:59.180' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (166, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-03-31T09:56:13.463' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (167, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-03-31T10:01:47.693' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (168, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-03-31T10:02:02.937' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (177, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-03-31T13:05:35.677' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (178, 1, NULL, 1, 58, N'?ã thích bài ??ng c?a b?n', 7, 13, CAST(N'2021-03-31T13:15:43.380' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (179, 1, NULL, 1, 58, N'?ã thích bài ??ng c?a b?n', 7, 13, CAST(N'2021-03-31T13:37:22.357' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (180, 1, NULL, 1, 58, N'?ã thích bài ??ng c?a b?n', 7, 13, CAST(N'2021-03-31T13:45:08.973' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (181, 1, NULL, 1, 58, N'?ã thích bài ??ng c?a b?n', 7, 13, CAST(N'2021-03-31T13:51:05.393' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (182, 1, NULL, 1, 60, N'?ã thích bài ??ng c?a b?n', 7, 13, CAST(N'2021-03-31T13:51:29.050' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (183, 1, NULL, 1, 60, N'?ã thích bài ??ng c?a b?n', 7, 13, CAST(N'2021-03-31T13:52:07.000' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (184, 1, NULL, 1, 60, N'?ã thích bài ??ng c?a b?n', 7, 13, CAST(N'2021-03-31T13:52:21.027' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (185, 1, NULL, 1, 60, N'?ã thích bài ??ng c?a b?n', 7, 13, CAST(N'2021-03-31T13:52:25.527' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (186, 1, NULL, 1, 60, N'?ã thích bài ??ng c?a b?n', 7, 13, CAST(N'2021-03-31T13:53:48.853' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (187, 1, NULL, 1, 60, N'?ã thích bài ??ng c?a b?n', 7, 13, CAST(N'2021-03-31T13:53:50.263' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (188, 1, NULL, 1, 60, N'?ã thích bài ??ng c?a b?n', 7, 13, CAST(N'2021-03-31T13:55:44.607' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (189, 1, NULL, 1, 60, N'?ã thích bài ??ng c?a b?n', 7, 13, CAST(N'2021-03-31T13:55:49.973' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (190, 1, NULL, 1, 60, N'?ã thích bài ??ng c?a b?n', 13, 13, CAST(N'2021-03-31T13:56:29.267' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (191, 1, NULL, 1, 60, N'?ã thích bài ??ng c?a b?n', 13, 13, CAST(N'2021-03-31T13:56:30.817' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (192, 1, NULL, 1, 60, N'?ã thích bài ??ng c?a b?n', 13, 13, CAST(N'2021-03-31T14:02:26.147' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (193, 1, NULL, 1, 58, N'?ã thích bài ??ng c?a b?n', 13, 13, CAST(N'2021-03-31T14:02:54.187' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (194, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-03-31T14:03:28.567' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (195, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-03-31T14:03:51.367' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (196, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-03-31T14:05:28.370' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (197, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-03-31T14:05:34.190' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (198, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-03-31T14:05:46.663' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (199, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-03-31T14:06:34.183' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (200, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-03-31T14:06:35.763' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (201, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-03-31T14:06:37.447' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (202, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-03-31T14:06:38.490' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (203, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-03-31T14:06:39.370' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (204, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-03-31T14:06:40.303' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (205, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-03-31T14:06:41.007' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (206, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-03-31T14:07:42.877' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (207, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-03-31T14:07:47.597' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (208, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-03-31T14:07:51.077' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (209, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-03-31T14:10:46.790' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (210, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-03-31T14:10:53.540' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (211, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-03-31T14:12:07.850' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (212, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-03-31T14:14:00.933' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (213, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-03-31T14:14:05.047' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (214, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-03-31T14:14:09.323' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (215, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-03-31T14:20:11.840' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (216, 1, NULL, 1, 70, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-03-31T14:20:19.067' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (220, 1, NULL, 1, 64, N'?ã thích bài ??ng c?a b?n', 7, 7, CAST(N'2021-03-31T16:06:31.400' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (221, 1, NULL, 1, 64, N'?ã thích bài ??ng c?a b?n', 7, 7, CAST(N'2021-03-31T16:06:34.617' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (248, 1, NULL, 1, 64, N'?ã thích bài ??ng c?a b?n', 7, 7, CAST(N'2021-03-31T16:55:22.223' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (249, 1, NULL, 1, 62, N'?ã thích bài ??ng c?a b?n', 7, 13, CAST(N'2021-03-31T16:55:31.513' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (250, 3, NULL, 1, 64, N'?ã ?ánh giá bài ??ng c?a b?n', 7, 7, CAST(N'2021-03-31T16:55:34.703' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (251, 1, NULL, 1, 60, N'?ã thích bài ??ng c?a b?n', 7, 13, CAST(N'2021-03-31T16:55:39.130' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (252, 1, NULL, 1, 59, N'?ã thích bài ??ng c?a b?n', 7, 13, CAST(N'2021-03-31T16:55:41.393' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (292, 3, NULL, 1, 64, N'?ã ?ánh giá bài ??ng c?a b?n', 7, 7, CAST(N'2021-04-01T11:27:46.867' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (293, 3, NULL, 1, 64, N'?ã ?ánh giá bài ??ng c?a b?n', 7, 7, CAST(N'2021-04-01T11:33:46.850' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (294, 3, NULL, 1, 64, N'?ã ?ánh giá bài ??ng c?a b?n', 7, 7, CAST(N'2021-04-01T13:49:47.927' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (295, 3, NULL, 1, 64, N'?ã ?ánh giá bài ??ng c?a b?n', 7, 7, CAST(N'2021-04-01T17:35:47.113' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (296, 3, NULL, 1, 64, N'?ã ?ánh giá bài ??ng c?a b?n', 7, 7, CAST(N'2021-04-01T17:36:01.123' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (297, 3, NULL, 1, 64, N'?ã ?ánh giá bài ??ng c?a b?n', 7, 7, CAST(N'2021-04-01T17:36:57.650' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (298, 3, NULL, 1, 64, N'?ã ?ánh giá bài ??ng c?a b?n', 7, 7, CAST(N'2021-04-01T17:37:05.970' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (299, 3, NULL, 1, 64, N'?ã ?ánh giá bài ??ng c?a b?n', 7, 7, CAST(N'2021-04-01T17:37:29.547' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (300, 3, NULL, 1, 64, N'?ã ?ánh giá bài ??ng c?a b?n', 7, 7, CAST(N'2021-04-01T17:43:00.067' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (301, 3, NULL, 1, 64, N'?ã ?ánh giá bài ??ng c?a b?n', 7, 7, CAST(N'2021-04-01T17:44:11.577' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (302, 1, NULL, 1, 64, N'?ã thích bài ??ng c?a b?n', 7, 7, CAST(N'2021-04-01T17:58:03.707' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (303, 3, NULL, 1, 64, N'?ã ?ánh giá bài ??ng c?a b?n', 7, 7, CAST(N'2021-04-01T18:07:38.727' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (304, 1, NULL, 1, 64, N'?ã thích bài ??ng c?a b?n', 7, 7, CAST(N'2021-04-01T18:44:22.690' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (305, 1, NULL, 1, 64, N'?ã thích bài ??ng c?a b?n', 7, 7, CAST(N'2021-04-01T18:48:35.297' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (306, 1, NULL, 1, 64, N'?ã thích bài ??ng c?a b?n', 7, 7, CAST(N'2021-04-01T18:48:50.360' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (307, 3, NULL, 1, 64, N'?ã ?ánh giá bài ??ng c?a b?n', 7, 7, CAST(N'2021-04-01T18:48:55.987' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (308, 3, NULL, 1, 64, N'?ã ?ánh giá bài ??ng c?a b?n', 7, 7, CAST(N'2021-04-01T18:48:57.453' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (309, 1, NULL, 1, 64, N'?ã thích bài ??ng c?a b?n', 7, 7, CAST(N'2021-04-01T18:49:04.663' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (310, 1, NULL, 1, 64, N'?ã thích bài ??ng c?a b?n', 7, 7, CAST(N'2021-04-02T01:47:14.743' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (311, 1, NULL, 1, 64, N'?ã thích bài ??ng c?a b?n', 7, 7, CAST(N'2021-04-02T01:47:19.660' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (312, 1, NULL, 1, 64, N'?ã thích bài ??ng c?a b?n', 7, 7, CAST(N'2021-04-02T01:47:26.413' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (313, 3, NULL, 1, 64, N'?ã ?ánh giá bài ??ng c?a b?n', 7, 7, CAST(N'2021-04-02T02:38:00.323' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (314, 3, NULL, 1, 64, N'?ã ?ánh giá bài ??ng c?a b?n', 7, 7, CAST(N'2021-04-02T02:38:06.897' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (315, 3, NULL, 1, 59, N'?ã ?ánh giá bài ??ng c?a b?n', 13, 13, CAST(N'2021-04-02T03:30:19.780' AS DateTime))
GO
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (316, 3, NULL, 1, 59, N'?ã ?ánh giá bài ??ng c?a b?n', 13, 13, CAST(N'2021-04-02T03:30:20.680' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (317, 3, NULL, 1, 58, N'?ã ?ánh giá bài ??ng c?a b?n', 13, 13, CAST(N'2021-04-02T03:30:29.080' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (318, 3, NULL, 1, 58, N'?ã ?ánh giá bài ??ng c?a b?n', 13, 13, CAST(N'2021-04-02T03:30:33.807' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (319, 3, NULL, 1, 59, N'?ã ?ánh giá bài ??ng c?a b?n', 13, 13, CAST(N'2021-04-02T03:30:40.760' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (320, 3, NULL, 1, 64, N'?ã ?ánh giá bài ??ng c?a b?n', 13, 7, CAST(N'2021-04-03T01:54:30.330' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (321, 1, NULL, 1, 64, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-04-03T01:54:34.620' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (322, 1, NULL, 1, 64, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-04-03T02:10:58.927' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (323, 1, NULL, 1, 64, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-04-03T07:23:46.790' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (324, 3, NULL, 1, 64, N'?ã ?ánh giá bài ??ng c?a b?n', 13, 7, CAST(N'2021-04-04T09:15:16.053' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (325, 3, NULL, 1, 64, N'?ã ?ánh giá bài ??ng c?a b?n', 13, 7, CAST(N'2021-04-04T09:47:08.687' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (326, 4, NULL, 1, 0, N'?ã theo dõi b?n', 5, 7, CAST(N'2021-04-04T15:14:50.800' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (327, 1, NULL, 1, 64, N'?ã thích bài ??ng c?a b?n', 5, 7, CAST(N'2021-04-04T15:15:30.533' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (328, 1, NULL, 1, 64, N'?ã thích bài ??ng c?a b?n', 5, 7, CAST(N'2021-04-04T15:15:56.923' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (329, 3, NULL, 1, 60, N'?ã ?ánh giá bài ??ng c?a b?n', 7, 13, CAST(N'2021-04-04T15:19:47.410' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (330, 1, NULL, 1, 64, N'?ã thích bài ??ng c?a b?n', 5, 7, CAST(N'2021-04-04T15:46:57.213' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (331, 1, NULL, 1, 64, N'?ã thích bài ??ng c?a b?n', 5, 7, CAST(N'2021-04-04T15:48:43.930' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (332, 1, NULL, 1, 64, N'?ã thích bài ??ng c?a b?n', 5, 7, CAST(N'2021-04-04T15:50:02.930' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (333, 1, NULL, 1, 64, N'?ã thích bài ??ng c?a b?n', 5, 7, CAST(N'2021-04-04T16:04:28.730' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (334, 1, NULL, 1, 64, N'?ã thích bài ??ng c?a b?n', 5, 7, CAST(N'2021-04-04T16:23:58.003' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (335, 1, NULL, 1, 64, N'?ã thích bài ??ng c?a b?n', 5, 7, CAST(N'2021-04-04T16:32:35.663' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (336, 1, NULL, 1, 64, N'?ã thích bài ??ng c?a b?n', 5, 7, CAST(N'2021-04-04T16:42:53.690' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (337, 1, NULL, 1, 64, N'?ã thích bài ??ng c?a b?n', 5, 7, CAST(N'2021-04-04T16:46:25.003' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (338, 1, NULL, 1, 62, N'?ã thích bài ??ng c?a b?n', 7, 13, CAST(N'2021-04-05T08:13:48.127' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (340, 1, NULL, 1, 64, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-04-06T09:52:45.143' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (341, 1, NULL, 1, 62, N'?ã thích bài ??ng c?a b?n', 7, 13, CAST(N'2021-04-06T09:53:51.403' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (342, 1, NULL, 1, 62, N'?ã thích bài ??ng c?a b?n', 7, 13, CAST(N'2021-04-06T09:55:20.647' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (343, 1, NULL, 1, 62, N'?ã thích bài ??ng c?a b?n', 7, 13, CAST(N'2021-04-06T09:57:07.527' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (344, 1, NULL, 1, 62, N'?ã thích bài ??ng c?a b?n', 7, 13, CAST(N'2021-04-06T10:00:06.667' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (345, 3, NULL, 1, 62, N'?ã ?ánh giá bài ??ng c?a b?n', 7, 13, CAST(N'2021-04-06T12:11:17.860' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (346, 3, NULL, 1, 62, N'?ã ?ánh giá bài ??ng c?a b?n', 7, 13, CAST(N'2021-04-06T12:11:18.540' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (347, 3, NULL, 1, 62, N'?ã ?ánh giá bài ??ng c?a b?n', 7, 13, CAST(N'2021-04-06T12:11:18.793' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (348, 3, NULL, 1, 62, N'?ã ?ánh giá bài ??ng c?a b?n', 7, 13, CAST(N'2021-04-06T12:11:18.800' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (349, 3, NULL, 1, 62, N'?ã ?ánh giá bài ??ng c?a b?n', 7, 13, CAST(N'2021-04-06T12:11:21.200' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (350, 3, NULL, 1, 62, N'?ã ?ánh giá bài ??ng c?a b?n', 7, 13, CAST(N'2021-04-06T12:11:21.543' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (351, 3, NULL, 1, 62, N'?ã ?ánh giá bài ??ng c?a b?n', 7, 13, CAST(N'2021-04-06T12:11:22.037' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (352, 3, NULL, 1, 62, N'?ã ?ánh giá bài ??ng c?a b?n', 7, 13, CAST(N'2021-04-06T12:11:22.480' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (353, 3, NULL, 1, 62, N'?ã ?ánh giá bài ??ng c?a b?n', 7, 13, CAST(N'2021-04-06T12:11:22.490' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (354, 3, NULL, 1, 62, N'?ã ?ánh giá bài ??ng c?a b?n', 7, 13, CAST(N'2021-04-06T12:14:33.037' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (355, 3, NULL, 1, 62, N'?ã ?ánh giá bài ??ng c?a b?n', 7, 13, CAST(N'2021-04-06T12:14:36.710' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (356, 3, NULL, 1, 62, N'?ã ?ánh giá bài ??ng c?a b?n', 7, 13, CAST(N'2021-04-06T12:14:36.933' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (357, 3, NULL, 1, 62, N'?ã ?ánh giá bài ??ng c?a b?n', 7, 13, CAST(N'2021-04-06T12:14:38.210' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (358, 3, NULL, 1, 62, N'?ã ?ánh giá bài ??ng c?a b?n', 7, 13, CAST(N'2021-04-06T12:14:40.377' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (359, 3, NULL, 1, 61, N'?ã ?ánh giá bài ??ng c?a b?n', 7, 13, CAST(N'2021-04-06T12:14:42.633' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (360, 3, NULL, 1, 61, N'?ã ?ánh giá bài ??ng c?a b?n', 7, 13, CAST(N'2021-04-06T12:14:43.597' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (361, 3, NULL, 1, 61, N'?ã ?ánh giá bài ??ng c?a b?n', 7, 13, CAST(N'2021-04-06T12:16:11.970' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (362, 3, NULL, 1, 61, N'?ã ?ánh giá bài ??ng c?a b?n', 7, 13, CAST(N'2021-04-06T12:16:12.603' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (363, 3, NULL, 1, 61, N'?ã ?ánh giá bài ??ng c?a b?n', 7, 13, CAST(N'2021-04-06T12:16:13.390' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (364, 5, NULL, 1, 77, N'Hình ?nh b?n v?a t?i lên có n?i dung không phù h?p! M?i ng??i s? không th? nhìn th?y bài vi?t này!', 0, 7, CAST(N'2021-04-07T12:00:06.597' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (365, 3, NULL, 1, 78, N'?ã ?ánh giá bài ??ng c?a b?n', 13, 7, CAST(N'2021-04-07T14:54:02.470' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (366, 3, NULL, 1, 78, N'?ã ?ánh giá bài ??ng c?a b?n', 13, 7, CAST(N'2021-04-08T12:06:06.597' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (367, 3, NULL, 1, 78, N'?ã ?ánh giá bài ??ng c?a b?n', 13, 7, CAST(N'2021-04-08T12:06:08.853' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (368, 3, NULL, 1, 84, N'?ã ?ánh giá bài ??ng c?a b?n', 13, 7, CAST(N'2021-04-08T12:06:18.567' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (369, 3, NULL, 1, 78, N'?ã ?ánh giá bài ??ng c?a b?n', 13, 7, CAST(N'2021-04-08T12:06:21.200' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (370, 3, NULL, 1, 84, N'?ã ?ánh giá bài ??ng c?a b?n', 13, 7, CAST(N'2021-04-08T14:07:28.617' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (371, 4, NULL, 1, 0, N'?ã theo dõi b?n', 13, 7, CAST(N'2021-04-11T13:51:27.627' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (372, 1, NULL, 1, 84, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-04-11T15:38:56.867' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (373, 2, NULL, 1, 78, N'?ã bình lu?n v? bài ??ng c?a b?n', 5, 7, CAST(N'2021-04-11T17:47:55.940' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (374, 2, NULL, 1, 78, N'?ã bình lu?n v? bài ??ng c?a b?n', 5, 7, CAST(N'2021-04-11T17:48:25.327' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (375, 3, NULL, 1, 78, N'?ã ?ánh giá bài ??ng c?a b?n', 5, 7, CAST(N'2021-04-11T17:48:41.337' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (376, 3, NULL, 1, 78, N'?ã ?ánh giá bài ??ng c?a b?n', 5, 7, CAST(N'2021-04-11T17:48:43.560' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (377, 3, NULL, 1, 78, N'?ã ?ánh giá bài ??ng c?a b?n', 5, 7, CAST(N'2021-04-11T17:48:48.597' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (378, 3, NULL, 1, 78, N'?ã ?ánh giá bài ??ng c?a b?n', 5, 7, CAST(N'2021-04-11T17:48:52.277' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (379, 3, NULL, 1, 78, N'?ã ?ánh giá bài ??ng c?a b?n', 5, 7, CAST(N'2021-04-11T17:48:55.323' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (380, 3, NULL, 1, 78, N'?ã ?ánh giá bài ??ng c?a b?n', 5, 7, CAST(N'2021-04-11T17:48:57.333' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (381, 3, NULL, 1, 78, N'?ã ?ánh giá bài ??ng c?a b?n', 5, 7, CAST(N'2021-04-11T17:48:58.370' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (382, 2, NULL, 1, 85, N'?ã bình lu?n v? bài ??ng c?a b?n', 13, 7, CAST(N'2021-04-12T11:30:56.810' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (383, 2, NULL, 1, 85, N'?ã bình lu?n v? bài ??ng c?a b?n', 13, 7, CAST(N'2021-04-12T11:31:07.263' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (384, 2, NULL, 1, 85, N'?ã bình lu?n v? bài ??ng c?a b?n', 13, 7, CAST(N'2021-04-12T11:31:09.717' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (385, 2, NULL, 1, 85, N'?ã bình lu?n v? bài ??ng c?a b?n', 13, 7, CAST(N'2021-04-12T11:31:22.707' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (386, 2, NULL, 1, 85, N'?ã bình lu?n v? bài ??ng c?a b?n', 13, 7, CAST(N'2021-04-12T11:34:51.893' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (387, 1, NULL, 1, 85, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-04-12T12:08:06.507' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (388, 3, NULL, 1, 85, N'?ã ?ánh giá bài ??ng c?a b?n', 13, 7, CAST(N'2021-04-12T12:08:13.977' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (389, 3, NULL, 1, 85, N'?ã ?ánh giá bài ??ng c?a b?n', 13, 7, CAST(N'2021-04-12T12:08:17.643' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (390, 4, NULL, 0, 0, N'?ã theo dõi b?n', 7, 5, CAST(N'2021-04-13T08:54:08.950' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (391, 5, NULL, 1, NULL, N'Feedback c?a b?n ?ã ???c ghi nh?n, c?m ?n b?n ?ã ?óng góp cho SOFA', 0, 13, CAST(N'2021-04-13T15:58:00.830' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (392, 1, NULL, 1, 87, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-04-13T17:21:08.400' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (393, 2, NULL, 1, 87, N'?ã bình lu?n v? bài ??ng c?a b?n', 13, 7, CAST(N'2021-04-13T17:21:29.197' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (394, 3, NULL, 1, 87, N'?ã ?ánh giá bài ??ng c?a b?n', 13, 7, CAST(N'2021-04-13T17:21:44.613' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (395, 1, NULL, 1, 87, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-04-13T17:23:39.720' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (396, 4, NULL, 1, 0, N'?ã theo dõi b?n', 13, 7, CAST(N'2021-04-13T17:26:19.140' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (397, 1, NULL, 1, 87, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-04-13T17:46:09.513' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (398, 1, NULL, 1, 87, N'?ã thích bài ??ng c?a b?n', 13, 7, CAST(N'2021-04-13T17:47:28.533' AS DateTime))
INSERT [dbo].[Notification] ([Id], [TypeNotification], [TypeAction], [IsRead], [PostId], [Content], [FromAccount], [ToAccount], [DateCreated]) VALUES (399, 4, NULL, 1, 0, N'?ã theo dõi b?n', 7, 13, CAST(N'2021-04-13T17:52:00.533' AS DateTime))
SET IDENTITY_INSERT [dbo].[Notification] OFF
GO
SET IDENTITY_INSERT [dbo].[OTP] ON 

INSERT [dbo].[OTP] ([ID], [Code]) VALUES (7, 125224)
SET IDENTITY_INSERT [dbo].[OTP] OFF
GO
SET IDENTITY_INSERT [dbo].[Post] ON 

INSERT [dbo].[Post] ([Id], [Content], [PrivacyID], [Time], [AccountPost], [BodyInfoID], [IsVerified], [Type]) VALUES (78, N'Linh Ka', 3, CAST(N'2021-04-07T14:53:03.600' AS DateTime), 7, 11, 1, 0)
INSERT [dbo].[Post] ([Id], [Content], [PrivacyID], [Time], [AccountPost], [BodyInfoID], [IsVerified], [Type]) VALUES (84, N'Qu?n jean body
Giá: 159k', 3, CAST(N'2021-04-08T03:35:03.363' AS DateTime), 7, 0, 1, 1)
INSERT [dbo].[Post] ([Id], [Content], [PrivacyID], [Time], [AccountPost], [BodyInfoID], [IsVerified], [Type]) VALUES (85, N'S? mi thanh l?ch
Giá: 189k', 3, CAST(N'2021-04-12T03:56:12.247' AS DateTime), 7, 0, 1, 1)
INSERT [dbo].[Post] ([Id], [Content], [PrivacyID], [Time], [AccountPost], [BodyInfoID], [IsVerified], [Type]) VALUES (87, N'Qu?n jean r?ng
Giá: 1xx', 3, CAST(N'2021-04-13T15:27:32.707' AS DateTime), 7, 0, 1, 1)
SET IDENTITY_INSERT [dbo].[Post] OFF
GO
SET IDENTITY_INSERT [dbo].[Privacy] ON 

INSERT [dbo].[Privacy] ([Id], [Name], [Description]) VALUES (1, N'Private', N'Ch? ng??i ??ng bài có th? nhìn th?y bài vi?t này')
INSERT [dbo].[Privacy] ([Id], [Name], [Description]) VALUES (2, N'Only Friend', N'Ch? nh?ng ng??i theo dõi m?i có th? nhìn th?y bài vi?t này')
INSERT [dbo].[Privacy] ([Id], [Name], [Description]) VALUES (3, N'Public', N'T?t c? m?i ng??i ??u có th? nhìn th?y bài vi?t này')
SET IDENTITY_INSERT [dbo].[Privacy] OFF
GO
INSERT [dbo].[Profile] ([AccountId], [FirstName], [LastName], [Gender], [DOB], [Email], [Phone], [Address], [Avatar], [IsFashionista]) VALUES (1, N'Vi?t', N'Nam', 1, CAST(N'2020-02-01' AS Date), N'dunghvhe13@gmail.com', N'1233412', N'hà Nam', N'dunghv/avatar/15.png', 0)
INSERT [dbo].[Profile] ([AccountId], [FirstName], [LastName], [Gender], [DOB], [Email], [Phone], [Address], [Avatar], [IsFashionista]) VALUES (2, N'Huy', N'Hoàng', 1, CAST(N'1999-09-09' AS Date), N'asd@asd.com', N'123123123', N'hà n?i', NULL, 0)
INSERT [dbo].[Profile] ([AccountId], [FirstName], [LastName], [Gender], [DOB], [Email], [Phone], [Address], [Avatar], [IsFashionista]) VALUES (3, NULL, NULL, NULL, NULL, N'tungnt@fpt.edu.vn', N'12345678910', NULL, NULL, 0)
INSERT [dbo].[Profile] ([AccountId], [FirstName], [LastName], [Gender], [DOB], [Email], [Phone], [Address], [Avatar], [IsFashionista]) VALUES (4, N'Th?o', N'D?ng', 0, CAST(N'2000-06-14' AS Date), N'vank48dhv@gmail.com', N'0942561863', N'Hà Nam', N'user/avatar/17.png', 0)
INSERT [dbo].[Profile] ([AccountId], [FirstName], [LastName], [Gender], [DOB], [Email], [Phone], [Address], [Avatar], [IsFashionista]) VALUES (5, N'Lê Thi?n', N'V?n', 1, CAST(N'1999-02-18' AS Date), N'Tungnt@gmail.com', N'0344261997', N'Hà N?i ', N'Test123/avatar/1.png', 0)
INSERT [dbo].[Profile] ([AccountId], [FirstName], [LastName], [Gender], [DOB], [Email], [Phone], [Address], [Avatar], [IsFashionista]) VALUES (6, NULL, NULL, NULL, NULL, N'Xyz@fpt.net', N'9999999999', NULL, NULL, 0)
INSERT [dbo].[Profile] ([AccountId], [FirstName], [LastName], [Gender], [DOB], [Email], [Phone], [Address], [Avatar], [IsFashionista]) VALUES (7, N'Mai V?n', N'Viên', 1, CAST(N'1998-01-01' AS Date), N'Abc@gmail.com', N'0969614666', N'Thanh Hóa', N'VienMV/avatar/1.png', 1)
INSERT [dbo].[Profile] ([AccountId], [FirstName], [LastName], [Gender], [DOB], [Email], [Phone], [Address], [Avatar], [IsFashionista]) VALUES (8, N'Vi?t', N'D?ng', 1, CAST(N'2000-06-14' AS Date), N'Anhttha140274@fpt.edu.vn', N'0865964056', N'??i h?c FPT', N'Aeri12345/avatar/2.png', 0)
INSERT [dbo].[Profile] ([AccountId], [FirstName], [LastName], [Gender], [DOB], [Email], [Phone], [Address], [Avatar], [IsFashionista]) VALUES (10, N'tung', N'nguyen', NULL, NULL, N'provip123@fpt.edu.vn', N'1234567899', NULL, NULL, 0)
INSERT [dbo].[Profile] ([AccountId], [FirstName], [LastName], [Gender], [DOB], [Email], [Phone], [Address], [Avatar], [IsFashionista]) VALUES (11, N'Tungbin', N'Tungbin', NULL, NULL, N'Tungbin@a.com', N'0832337024', NULL, NULL, 0)
INSERT [dbo].[Profile] ([AccountId], [FirstName], [LastName], [Gender], [DOB], [Email], [Phone], [Address], [Avatar], [IsFashionista]) VALUES (12, N'Tùng', N'Nguy?n', NULL, NULL, N'Kakaka@gmail.com', N'0832337028', NULL, NULL, 0)
INSERT [dbo].[Profile] ([AccountId], [FirstName], [LastName], [Gender], [DOB], [Email], [Phone], [Address], [Avatar], [IsFashionista]) VALUES (17, N'Thanh Tùng', N'Nguy?n', NULL, NULL, N'tungnt.997@gmail.com', N'', NULL, NULL, 0)
INSERT [dbo].[Profile] ([AccountId], [FirstName], [LastName], [Gender], [DOB], [Email], [Phone], [Address], [Avatar], [IsFashionista]) VALUES (9, N'tung', N'nguyen', NULL, NULL, N'provip@fpt.edu.vn', N'1234567891', NULL, NULL, 0)
INSERT [dbo].[Profile] ([AccountId], [FirstName], [LastName], [Gender], [DOB], [Email], [Phone], [Address], [Avatar], [IsFashionista]) VALUES (13, N'Hacker', N'Mand', 1, CAST(N'1999-01-15' AS Date), N'havietdung99@gmail.com', N'0971454669', N'Hà N?i', N'dungtest/avatar/2.png', 0)
INSERT [dbo].[Profile] ([AccountId], [FirstName], [LastName], [Gender], [DOB], [Email], [Phone], [Address], [Avatar], [IsFashionista]) VALUES (18, N'Deptrai', N'An', NULL, NULL, N'Andeptrai@gmail.com', N'0379416224', NULL, N'Andeptrai/avatar/1.png', 0)
INSERT [dbo].[Profile] ([AccountId], [FirstName], [LastName], [Gender], [DOB], [Email], [Phone], [Address], [Avatar], [IsFashionista]) VALUES (19, N'Admin', N'Super', NULL, NULL, N'admin@sofa.com', N'0123456789', NULL, NULL, 0)
INSERT [dbo].[Profile] ([AccountId], [FirstName], [LastName], [Gender], [DOB], [Email], [Phone], [Address], [Avatar], [IsFashionista]) VALUES (20, N'Viên', N'Mai', NULL, NULL, N'Vienmv.dev@gmail.com', N'0973983546', NULL, NULL, 0)
GO
SET IDENTITY_INSERT [dbo].[Rate] ON 

INSERT [dbo].[Rate] ([Id], [PostId], [AccountRate], [RatePoint]) VALUES (32, 0, 7, 5)
INSERT [dbo].[Rate] ([Id], [PostId], [AccountRate], [RatePoint]) VALUES (37, 2, 7, 5)
INSERT [dbo].[Rate] ([Id], [PostId], [AccountRate], [RatePoint]) VALUES (40, 78, 7, 4)
INSERT [dbo].[Rate] ([Id], [PostId], [AccountRate], [RatePoint]) VALUES (41, 78, 13, 5)
INSERT [dbo].[Rate] ([Id], [PostId], [AccountRate], [RatePoint]) VALUES (42, 84, 13, 4)
INSERT [dbo].[Rate] ([Id], [PostId], [AccountRate], [RatePoint]) VALUES (43, 84, 7, 5)
INSERT [dbo].[Rate] ([Id], [PostId], [AccountRate], [RatePoint]) VALUES (44, 78, 5, 4)
INSERT [dbo].[Rate] ([Id], [PostId], [AccountRate], [RatePoint]) VALUES (45, 85, 7, 5)
INSERT [dbo].[Rate] ([Id], [PostId], [AccountRate], [RatePoint]) VALUES (46, 85, 13, 4)
INSERT [dbo].[Rate] ([Id], [PostId], [AccountRate], [RatePoint]) VALUES (48, 87, 13, 5)
INSERT [dbo].[Rate] ([Id], [PostId], [AccountRate], [RatePoint]) VALUES (49, 87, 7, 5)
SET IDENTITY_INSERT [dbo].[Rate] OFF
GO
INSERT [dbo].[Rating] ([Average]) VALUES (4)
GO
SET IDENTITY_INSERT [dbo].[RelationType] ON 

INSERT [dbo].[RelationType] ([Id], [Name], [Description]) VALUES (1, N'Follow', N'Follow someone')
INSERT [dbo].[RelationType] ([Id], [Name], [Description]) VALUES (2, N'Block', N'Block someone')
SET IDENTITY_INSERT [dbo].[RelationType] OFF
GO
SET IDENTITY_INSERT [dbo].[Role] ON 

INSERT [dbo].[Role] ([Id], [Name], [Descriptioncription]) VALUES (1, N'Admin', N'Administrator')
INSERT [dbo].[Role] ([Id], [Name], [Descriptioncription]) VALUES (2, N'User', N'User')
SET IDENTITY_INSERT [dbo].[Role] OFF
GO
SET IDENTITY_INSERT [dbo].[SupportRequest] ON 

INSERT [dbo].[SupportRequest] ([Id], [RequestType], [UserRequestId], [TimeCreate], [Status], [Respone]) VALUES (14, 1, 13, CAST(N'2021-04-14T03:05:37.087' AS DateTime), 2, N'')
SET IDENTITY_INSERT [dbo].[SupportRequest] OFF
GO
SET IDENTITY_INSERT [dbo].[SupportRequestType] ON 

INSERT [dbo].[SupportRequestType] ([Id], [Name], [Description]) VALUES (1, N'Fashionista', N'When someone wants to become a fashionista')
INSERT [dbo].[SupportRequestType] ([Id], [Name], [Description]) VALUES (2, N'Block account', N'When someone wants block his/her account for a time')
SET IDENTITY_INSERT [dbo].[SupportRequestType] OFF
GO
SET IDENTITY_INSERT [dbo].[Transactions] ON 

INSERT [dbo].[Transactions] ([Id], [Name], [Type], [Amount], [AdminId], [Date], [CheckSum], [Description]) VALUES (1, NULL, 1, CAST(500000.000000 AS Decimal(18, 6)), 1, CAST(N'2021-03-11T10:47:06.427' AS DateTime), N'6AF20C8627', N'topup')
INSERT [dbo].[Transactions] ([Id], [Name], [Type], [Amount], [AdminId], [Date], [CheckSum], [Description]) VALUES (2, NULL, 1, CAST(400000.000000 AS Decimal(18, 6)), 1, CAST(N'2021-03-11T10:47:14.470' AS DateTime), N'ACC791C69B', N'topup')
INSERT [dbo].[Transactions] ([Id], [Name], [Type], [Amount], [AdminId], [Date], [CheckSum], [Description]) VALUES (3, NULL, 1, CAST(700000.000000 AS Decimal(18, 6)), 1, CAST(N'2021-03-11T10:47:19.500' AS DateTime), N'58402CA6ED', N'topup')
INSERT [dbo].[Transactions] ([Id], [Name], [Type], [Amount], [AdminId], [Date], [CheckSum], [Description]) VALUES (4, NULL, 1, CAST(200000.000000 AS Decimal(18, 6)), 1, CAST(N'2021-03-12T02:44:41.520' AS DateTime), N'E22A76A46E', N'topup')
INSERT [dbo].[Transactions] ([Id], [Name], [Type], [Amount], [AdminId], [Date], [CheckSum], [Description]) VALUES (5, NULL, 1, CAST(300000.000000 AS Decimal(18, 6)), 1, CAST(N'2021-03-12T02:45:02.823' AS DateTime), N'9ED71D4933', N'topup')
INSERT [dbo].[Transactions] ([Id], [Name], [Type], [Amount], [AdminId], [Date], [CheckSum], [Description]) VALUES (6, NULL, 1, CAST(300000.000000 AS Decimal(18, 6)), 1, CAST(N'2021-04-02T02:18:41.463' AS DateTime), N'77E6157925', N'topup')
INSERT [dbo].[Transactions] ([Id], [Name], [Type], [Amount], [AdminId], [Date], [CheckSum], [Description]) VALUES (7, NULL, 1, CAST(300000.000000 AS Decimal(18, 6)), 1, CAST(N'2021-04-02T02:18:45.570' AS DateTime), N'DD135723D9', N'topup')
INSERT [dbo].[Transactions] ([Id], [Name], [Type], [Amount], [AdminId], [Date], [CheckSum], [Description]) VALUES (8, NULL, 1, CAST(500000.000000 AS Decimal(18, 6)), 1, CAST(N'2021-04-02T02:18:52.247' AS DateTime), N'061AE85BF2', N'topup')
INSERT [dbo].[Transactions] ([Id], [Name], [Type], [Amount], [AdminId], [Date], [CheckSum], [Description]) VALUES (9, NULL, 1, CAST(500000.000000 AS Decimal(18, 6)), 1, CAST(N'2021-04-06T09:52:00.420' AS DateTime), N'E0C99C5EA4', N'topup')
SET IDENTITY_INSERT [dbo].[Transactions] OFF
GO
INSERT [dbo].[TransactionType] ([Id], [Name], [Description]) VALUES (1, N'Top Up Account', N'Top Up Account')
GO
SET IDENTITY_INSERT [dbo].[TypeNotification] ON 

INSERT [dbo].[TypeNotification] ([Id], [Name], [Description]) VALUES (1, N'Like', N'Like post')
INSERT [dbo].[TypeNotification] ([Id], [Name], [Description]) VALUES (2, N'Comment', N'Comment post')
INSERT [dbo].[TypeNotification] ([Id], [Name], [Description]) VALUES (3, N'Rate', N'Rate post')
INSERT [dbo].[TypeNotification] ([Id], [Name], [Description]) VALUES (4, N'Follow', N'Follow post')
SET IDENTITY_INSERT [dbo].[TypeNotification] OFF
GO
SET IDENTITY_INSERT [dbo].[Voucher] ON 

INSERT [dbo].[Voucher] ([Id], [Content], [Image], [FromDate], [ToDate], [IsExpires], [Code], [Quantity], [Title], [Description]) VALUES (1, N'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu lectus justo. Vivamus tincidunt aliquam quam molestie rhoncus. Nam condimentum dolor nunc, ut lobortis lectus laoreet viverra. Nullam non sodales risus. Ut aliquet urna eget purus dapibus, id mollis lacus lobortis. Morbi mollis rhoncus blandit. Sed a lorem volutpat, tempor massa sit amet, consequat tortor. Proin bibendum venenatis turpis eu dapibus. Maecenas rutrum, dolor vitae condimentum pharetra, odio justo dictum augue, eleifend gravida nisi metus vel lacus. Etiam ligula odio, pharetra vel consequat sed, finibus et risus.', NULL, CAST(N'2021-03-13' AS Date), CAST(N'2021-03-17' AS Date), 0, N'12345', -1, N'Adidas gi?m 50% ??n hàng ', NULL)
INSERT [dbo].[Voucher] ([Id], [Content], [Image], [FromDate], [ToDate], [IsExpires], [Code], [Quantity], [Title], [Description]) VALUES (2, N'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu lectus justo. Vivamus tincidunt aliquam quam molestie rhoncus. Nam condimentum dolor nunc, ut lobortis lectus laoreet viverra. Nullam non sodales risus. Ut aliquet urna eget purus dapibus, id mollis lacus lobortis. Morbi mollis rhoncus blandit. Sed a lorem volutpat, tempor massa sit amet, consequat tortor. Proin bibendum venenatis turpis eu dapibus. Maecenas rutrum, dolor vitae condimentum pharetra, odio justo dictum augue, eleifend gravida nisi metus vel lacus. Etiam ligula odio, pharetra vel consequat sed, finibus et risus.', NULL, CAST(N'2021-02-12' AS Date), CAST(N'2021-03-12' AS Date), 1, N'12345', -1, N'Nike gi?m 30% ??n hàng', NULL)
INSERT [dbo].[Voucher] ([Id], [Content], [Image], [FromDate], [ToDate], [IsExpires], [Code], [Quantity], [Title], [Description]) VALUES (3, N'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu lectus justo. Vivamus tincidunt aliquam quam molestie rhoncus. Nam condimentum dolor nunc, ut lobortis lectus laoreet viverra. Nullam non sodales risus. Ut aliquet urna eget purus dapibus, id mollis lacus lobortis. Morbi mollis rhoncus blandit. Sed a lorem volutpat, tempor massa sit amet, consequat tortor. Proin bibendum venenatis turpis eu dapibus. Maecenas rutrum, dolor vitae condimentum pharetra, odio justo dictum augue, eleifend gravida nisi metus vel lacus. Etiam ligula odio, pharetra vel consequat sed, finibus et risus.', NULL, CAST(N'2021-03-12' AS Date), CAST(N'2021-03-21' AS Date), 0, N'123456', -1, N'FitWay gi?m 30% giá ?? t?p th? thao', NULL)
INSERT [dbo].[Voucher] ([Id], [Content], [Image], [FromDate], [ToDate], [IsExpires], [Code], [Quantity], [Title], [Description]) VALUES (4, N'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu lectus justo. Vivamus tincidunt aliquam quam molestie rhoncus. Nam condimentum dolor nunc, ut lobortis lectus laoreet viverra. Nullam non sodales risus. Ut aliquet urna eget purus dapibus, id mollis lacus lobortis. Morbi mollis rhoncus blandit. Sed a lorem volutpat, tempor massa sit amet, consequat tortor. Proin bibendum venenatis turpis eu dapibus. Maecenas rutrum, dolor vitae condimentum pharetra, odio justo dictum augue, eleifend gravida nisi metus vel lacus. Etiam ligula odio, pharetra vel consequat sed, finibus et risus.', NULL, CAST(N'2021-02-12' AS Date), CAST(N'2021-05-12' AS Date), 0, N'123456', -1, N'Gi?m giá 30% áo mùa ?ông', NULL)
INSERT [dbo].[Voucher] ([Id], [Content], [Image], [FromDate], [ToDate], [IsExpires], [Code], [Quantity], [Title], [Description]) VALUES (5, N'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu lectus justo. Vivamus tincidunt aliquam quam molestie rhoncus. Nam condimentum dolor nunc, ut lobortis lectus laoreet viverra. Nullam non sodales risus. Ut aliquet urna eget purus dapibus, id mollis lacus lobortis. Morbi mollis rhoncus blandit. Sed a lorem volutpat, tempor massa sit amet, consequat tortor. Proin bibendum venenatis turpis eu dapibus. Maecenas rutrum, dolor vitae condimentum pharetra, odio justo dictum augue, eleifend gravida nisi metus vel lacus. Etiam ligula odio, pharetra vel consequat sed, finibus et risus.', NULL, CAST(N'2021-02-12' AS Date), CAST(N'2021-05-12' AS Date), 0, N'12345', -1, N'Gi?m 20% khi mua hàng t?i Alibaba', NULL)
SET IDENTITY_INSERT [dbo].[Voucher] OFF
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
/****** Object:  StoredProcedure [dbo].[AddImagePost]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[AddMailContent]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[AddMarkupPost]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[AddNewAccount]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[AddNewImage]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[AddNewMessage]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[AddNewMessageImage]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[AddNewNotification]    Script Date: 4/14/2021 10:35:24 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[AddNewNotification] @TypeNotification int, @PostId int, @Content nvarchar(MAX), @FromAccount int, @ToAccount int, @DateCreated datetime
AS
INSERT INTO [Notification](TypeNotification, IsRead, PostId, Content, FromAccount, ToAccount, DateCreated ) 
values(@TypeNotification, 0, @PostId, @Content, @FromAccount, @ToAccount, @DateCreated)
GO
/****** Object:  StoredProcedure [dbo].[AddNewNotificationFeedback]    Script Date: 4/14/2021 10:35:24 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[AddNewNotificationFeedback] @TypeNotification int, @Content nvarchar(MAX), @FromAccount int, @ToAccount int, @DateCreated datetime
AS
INSERT INTO [Notification](TypeNotification, IsRead, Content, FromAccount, ToAccount, DateCreated ) 
values(@TypeNotification, 0, @Content, @FromAccount, @ToAccount, @DateCreated)
GO
/****** Object:  StoredProcedure [dbo].[AddNewPost]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[AddNewStaff]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[AddOTP]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[AddVoucher]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[BanUser]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[CheckFollowed]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[CountCommentOfPost]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[CountLikeOfPost]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[CountPublicPostOfUser]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[CrateRate]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[CreateComment]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[CreateInfo]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[CreateNewConversation]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[CreateNewFeedback]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[CreateNewSupportRequest]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[CreateRate]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[DeleteAllImagesPostByPostID]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[DeleteComment]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[DeleteCoversation]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[DeleteImagePostByImageID]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[DeleteInfoByID]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[DeleteInfoOfUser]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[DeleteMailContentByCode]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[DeleteMailContentByID]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[DeleteMarkupPost]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[DeleteOTP]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[DeletePost]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[DeleteVoucher]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[FollowUser]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[GetAllCommentOfPost]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[GetAllCommentOfPostWithoutPaging]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[GetAllInfo]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[GetAllLikeOfPost]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[GetAllMarkupPost]    Script Date: 4/14/2021 10:35:24 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[GetAllMarkupPost]
@page INT, @rowsOfPage INT
AS
BEGIN
	SELECT * FROM MarkupPost
	ORDER BY ID ASC
	OFFSET (@page-1)*@rowsOfPage ROWS
	FETCH NEXT @rowsOfPage ROWS ONLY
END
GO
/****** Object:  StoredProcedure [dbo].[GetAllPostOfUser]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[GetAllPostWithoutPaging]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[GetAllPublicPost]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[GetAllPublicPostOfUser]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[GetAllRateOfPost]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[GetAllUserFeedback]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[GetAllUserWithoutPaging]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[GetAllVoucher]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[getBalanceByAccountID]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[GetConversationBy2AccountId]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[GetFeedbackById]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[GetFeedbackByUserId]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[GetFollowerCount]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[GetImagePostByID]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[GetImagesOfPostByPostID]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[GetInfoByAccountID]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[GetInfoByID]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[getLatMessage]    Script Date: 4/14/2021 10:35:24 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create PROCEDURE [dbo].[getLatMessage]
@AccountID int,
@ChatWithAccountId int

AS
BEGIN
Select @AccountID AccountId, P.AccountId ChatWithAccountId, A.[Time] TimeUpdate, A.[Content] lastMessage, A.[FromAccountId] lastSender, P.[FirstName] ChatWithFirstName, P.[LastName] ChatWithLastName, P.[Avatar] ChatWithAvatar, P.[Avatar] ChatWithAvatarUri
From (select Top(1) *
from Message m
where ((m.FromAccountId = @AccountID and m.ToAccountId = @ChatWithAccountId and m.SenderDeleted = 0 ) or (m.FromAccountId = @ChatWithAccountId and m.ToAccountId = @AccountID and m.ReceiverDeleted = 0)) 
order by m.[Time] DESC) as A Join Profile P
on (@ChatWithAccountId = P.AccountId)
End
GO
/****** Object:  StoredProcedure [dbo].[GetLikeOfUserForPost]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[GetListAccountChat]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[GetListFollower]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[GetMailContentByCode]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[GetMailContentByID]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[GetMarkupPostByPostIDAndAccountID]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[GetMarkupPostOfUser]    Script Date: 4/14/2021 10:35:24 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[GetMarkupPostOfUser]
@accountID INT, @page INT, @rowsOfPage INT
AS
BEGIN
	SELECT * FROM MarkupPost WHERE AccountID = @accountID
	ORDER BY ID ASC
	OFFSET (@page-1)*@rowsOfPage ROWS
	FETCH NEXT @rowsOfPage ROWS ONLY
END
GO
/****** Object:  StoredProcedure [dbo].[getMessageByConversationId]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[getMessageBySenderAndReceiverID]    Script Date: 4/14/2021 10:35:24 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
  CREATE PROC [dbo].[getMessageBySenderAndReceiverID]
  @userId1 int,
  @userId2 int
  AS
  BEGIN
  SELECT Message.Id, Message.FromAccountId, Message.ToAccountId, Message.Content, Message.SenderDeleted, Message.ReceiverDeleted, Message.IsRead, Message.ConversationId,Message.Time, MessageImage.Url
  FROM dbo.Message
  LEFT OUTER JOIN dbo.MessageImage
  ON Message.Id = MessageImage.MessageId
  where (Message.FromAccountId = @userId1 and Message.ToAccountId = @userId2 and SenderDeleted = 0 ) or (Message.FromAccountId = @userId2 and Message.ToAccountId = @userId1 and ReceiverDeleted = 0)
  order by Message.Time ASC
  END
GO
/****** Object:  StoredProcedure [dbo].[getNotificationByToAccount]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[getPeopleFollowByAccountID]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[GetPostByBodyInfoID]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[GetPostByID]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[GetPostByInfoID]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[GetPostByUserWithoutPaging]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[GetPostRateAverage]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[GetProfileByAccountID]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[GetProfileByEmail]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[GetProfileByName]    Script Date: 4/14/2021 10:35:24 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[GetProfileByName]
@keyword NVARCHAR(MAX), @page INT, @rowsOfPage INT
AS
BEGIN
	SELECT Account.Id, UserName, IsActive,IsBlock, Profile.AccountId, FirstName, LastName, Gender, DOB, Email, Phone, Address, Avatar, [Role].[Name] AS [role] 
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
/****** Object:  StoredProcedure [dbo].[GetProfileByPhone]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[GetProfileByUsername]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[GetRateOfUserForPost]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[GetSupportRequest]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[getTransactionHistoryByAccountID]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[GetUserBalanceById]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[GetUserById]    Script Date: 4/14/2021 10:35:24 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create PROCEDURE [dbo].[GetUserById] @Id int
AS
	SELECT c.Id, c.UserName, c.Password, c.IsActive, c.IsBlock, p.Email, p.Phone, r.Id as RoleId, r.Name as RoleName
	FROM Profile p inner join Account c on p.AccountId = c.Id inner join AccountRole ar on c.Id = ar.AccountId inner join Role r on ar.RoleId = r.Id
	WHERE c.Id = @Id
GO
/****** Object:  StoredProcedure [dbo].[GetUserByUserName]    Script Date: 4/14/2021 10:35:24 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetUserByUserName] @Username nvarchar(50)
AS
	SELECT * FROM Account c WHERE c.UserName = @Username
GO
/****** Object:  StoredProcedure [dbo].[GetUserDetailByID]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[GetUserWithRoleByEmail]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[GetUserWithRoleByPhone]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[GetUserWithRoleByUserName]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[getVoucherByAccountID]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[GetVoucherById]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[getVoucherDetailByAccountId]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[IsMarkedPost]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[LikePost]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[MarkAllNotificationAsReaded]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[SearchConversation]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[SearchPostByText]    Script Date: 4/14/2021 10:35:24 AM ******/
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
	WHERE (Content LIKE '%' + @keyWord + '%') OR (CONCAT(FirstName, ' ', LastName) LIKE '%' + @keyWord + '%')
	ORDER BY Time DESC
	OFFSET (@page-1)*@rowsOfPage ROWS
	FETCH NEXT @rowsOfPage ROWS ONLY
END
GO
/****** Object:  StoredProcedure [dbo].[SetDeleteFlagForMessage]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[setReadNotificationByAccountId]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[setReadNotificationById]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[topUpForAccount]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[UnbanUser]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[UnfollowUser]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[UnlikePost]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[UpdateComment]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[UpdateFeedbackStatus]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[UpdateImage]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[UpdateImagePostByID]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[UpdateInfo]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[UpdatePost]    Script Date: 4/14/2021 10:35:24 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[UpdatePost]
@postId INT, @content NVARCHAR(MAX), @privacyID INT, @time DATETIME, @bodyInfoID INT, @isVerified BIT
AS
BEGIN
	UPDATE dbo.Post 
	SET Content = @content, PrivacyID = @privacyID, Time = GETDATE(), IsVerified = @isVerified, BodyInfoID = @bodyInfoID
	WHERE Id = @postId
END
GO
/****** Object:  StoredProcedure [dbo].[UpdateProfileByAccountID]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[UpdateRate]    Script Date: 4/14/2021 10:35:24 AM ******/
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
/****** Object:  StoredProcedure [dbo].[UpdateUserPassword]    Script Date: 4/14/2021 10:35:24 AM ******/
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
