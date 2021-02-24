USE [master]
GO
/****** Object:  Database [CapstonesFull]    Script Date: 2/24/2021 8:51:55 PM ******/
CREATE DATABASE [CapstonesFull]
 
GO
USE [CapstonesFull]
GO
/****** Object:  Table [dbo].[Account]    Script Date: 2/24/2021 8:51:55 PM ******/
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
/****** Object:  Table [dbo].[AccountLogs]    Script Date: 2/24/2021 8:51:55 PM ******/
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
/****** Object:  Table [dbo].[AccountRelation]    Script Date: 2/24/2021 8:51:55 PM ******/
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
/****** Object:  Table [dbo].[AccountRole]    Script Date: 2/24/2021 8:51:55 PM ******/
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
/****** Object:  Table [dbo].[AccountVoucher]    Script Date: 2/24/2021 8:51:55 PM ******/
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
/****** Object:  Table [dbo].[Comment]    Script Date: 2/24/2021 8:51:55 PM ******/
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
/****** Object:  Table [dbo].[Conversation]    Script Date: 2/24/2021 8:51:55 PM ******/
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
/****** Object:  Table [dbo].[Image]    Script Date: 2/24/2021 8:51:55 PM ******/
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
/****** Object:  Table [dbo].[Info]    Script Date: 2/24/2021 8:51:55 PM ******/
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
/****** Object:  Table [dbo].[Like]    Script Date: 2/24/2021 8:51:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Like](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PostId] [int] NULL,
	[AcountLike] [int] NULL,
 CONSTRAINT [PK_Like] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MarkUpPost]    Script Date: 2/24/2021 8:51:55 PM ******/
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
/****** Object:  Table [dbo].[Message]    Script Date: 2/24/2021 8:51:55 PM ******/
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
/****** Object:  Table [dbo].[Notification]    Script Date: 2/24/2021 8:51:55 PM ******/
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
/****** Object:  Table [dbo].[Post]    Script Date: 2/24/2021 8:51:55 PM ******/
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
/****** Object:  Table [dbo].[Privacy]    Script Date: 2/24/2021 8:51:55 PM ******/
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
/****** Object:  Table [dbo].[Profile]    Script Date: 2/24/2021 8:51:55 PM ******/
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
/****** Object:  Table [dbo].[Rate]    Script Date: 2/24/2021 8:51:55 PM ******/
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
/****** Object:  Table [dbo].[Reason]    Script Date: 2/24/2021 8:51:55 PM ******/
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
/****** Object:  Table [dbo].[RelationType]    Script Date: 2/24/2021 8:51:55 PM ******/
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
/****** Object:  Table [dbo].[Report]    Script Date: 2/24/2021 8:51:55 PM ******/
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
/****** Object:  Table [dbo].[ReportReason]    Script Date: 2/24/2021 8:51:55 PM ******/
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
/****** Object:  Table [dbo].[ReportType]    Script Date: 2/24/2021 8:51:55 PM ******/
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
/****** Object:  Table [dbo].[Role]    Script Date: 2/24/2021 8:51:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Role](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NULL,
	[Description] [nvarchar](max) NULL,
 CONSTRAINT [PK_Role] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Transactions]    Script Date: 2/24/2021 8:51:55 PM ******/
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
/****** Object:  Table [dbo].[TransactionType]    Script Date: 2/24/2021 8:51:55 PM ******/
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
/****** Object:  Table [dbo].[TypeAction]    Script Date: 2/24/2021 8:51:55 PM ******/
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
/****** Object:  Table [dbo].[TypeNotification]    Script Date: 2/24/2021 8:51:55 PM ******/
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
/****** Object:  Table [dbo].[Voucher]    Script Date: 2/24/2021 8:51:55 PM ******/
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
ALTER TABLE [dbo].[AccountLogs]  WITH CHECK ADD  CONSTRAINT [FK_AccountLogs_Account] FOREIGN KEY([AccountID])
REFERENCES [dbo].[Account] ([Id])
GO
ALTER TABLE [dbo].[AccountLogs] CHECK CONSTRAINT [FK_AccountLogs_Account]
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
ALTER TABLE [dbo].[AccountRole]  WITH CHECK ADD  CONSTRAINT [FK_AccountRole_Role1] FOREIGN KEY([RoleId])
REFERENCES [dbo].[Role] ([Id])
GO
ALTER TABLE [dbo].[AccountRole] CHECK CONSTRAINT [FK_AccountRole_Role1]
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
ALTER TABLE [dbo].[Like]  WITH CHECK ADD  CONSTRAINT [FK_Like_Account] FOREIGN KEY([AcountLike])
REFERENCES [dbo].[Account] ([Id])
GO
ALTER TABLE [dbo].[Like] CHECK CONSTRAINT [FK_Like_Account]
GO
ALTER TABLE [dbo].[Like]  WITH CHECK ADD  CONSTRAINT [FK_Like_Post] FOREIGN KEY([PostId])
REFERENCES [dbo].[Post] ([Id])
GO
ALTER TABLE [dbo].[Like] CHECK CONSTRAINT [FK_Like_Post]
GO
ALTER TABLE [dbo].[MarkUpPost]  WITH CHECK ADD  CONSTRAINT [FK_MarkUpPost_Account] FOREIGN KEY([PostId])
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
ALTER TABLE [dbo].[Notification]  WITH CHECK ADD  CONSTRAINT [FK_Notification_TypeNotification1] FOREIGN KEY([TypeNotification])
REFERENCES [dbo].[TypeNotification] ([Id])
GO
ALTER TABLE [dbo].[Notification] CHECK CONSTRAINT [FK_Notification_TypeNotification1]
GO
ALTER TABLE [dbo].[Post]  WITH CHECK ADD  CONSTRAINT [FK_Post_Account] FOREIGN KEY([AccountPost])
REFERENCES [dbo].[Account] ([Id])
GO
ALTER TABLE [dbo].[Post] CHECK CONSTRAINT [FK_Post_Account]
GO
ALTER TABLE [dbo].[Post]  WITH CHECK ADD  CONSTRAINT [FK_Post_Comment] FOREIGN KEY([Id])
REFERENCES [dbo].[Comment] ([Id])
GO
ALTER TABLE [dbo].[Post] CHECK CONSTRAINT [FK_Post_Comment]
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
ALTER TABLE [dbo].[Rate]  WITH CHECK ADD  CONSTRAINT [FK_Rate_Account] FOREIGN KEY([AcountRate])
REFERENCES [dbo].[Account] ([Id])
GO
ALTER TABLE [dbo].[Rate] CHECK CONSTRAINT [FK_Rate_Account]
GO
ALTER TABLE [dbo].[Rate]  WITH CHECK ADD  CONSTRAINT [FK_Rate_Post] FOREIGN KEY([PostId])
REFERENCES [dbo].[Post] ([Id])
GO
ALTER TABLE [dbo].[Rate] CHECK CONSTRAINT [FK_Rate_Post]
GO
ALTER TABLE [dbo].[Report]  WITH CHECK ADD  CONSTRAINT [FK_Report_Account2] FOREIGN KEY([FromAccount])
REFERENCES [dbo].[Account] ([Id])
GO
ALTER TABLE [dbo].[Report] CHECK CONSTRAINT [FK_Report_Account2]
GO
ALTER TABLE [dbo].[Report]  WITH CHECK ADD  CONSTRAINT [FK_Report_ReportType] FOREIGN KEY([Id])
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
ALTER TABLE [dbo].[Transactions]  WITH CHECK ADD  CONSTRAINT [FK_Transactions_TransactionType] FOREIGN KEY([Type])
REFERENCES [dbo].[TransactionType] ([Id])
GO
ALTER TABLE [dbo].[Transactions] CHECK CONSTRAINT [FK_Transactions_TransactionType]
GO
/****** Object:  StoredProcedure [dbo].[AddImagePost]    Script Date: 2/24/2021 8:51:55 PM ******/
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
/****** Object:  StoredProcedure [dbo].[AddMailContent]    Script Date: 2/24/2021 8:51:55 PM ******/
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
/****** Object:  StoredProcedure [dbo].[AddNewAccount]    Script Date: 2/24/2021 8:51:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[AddNewAccount] @Username nvarchar(50), @Password nvarchar(MAX), @Email nvarchar(MAX), @Phone nvarchar(50), @RoleId int
AS
	INSERT INTO Account values(@Username, @Password, 1, 0)
	DECLARE @AccountID  AS int 
	SET @AccountID = SCOPE_IDENTITY()
	INSERT INTO Profile(AccountId, Email, Phone) VALUES(@AccountID, @Email, @Phone)
	INSERT INTO AccountRole(AccountId, RoleId) values(@AccountID, @RoleId)
GO
/****** Object:  StoredProcedure [dbo].[AddOTP]    Script Date: 2/24/2021 8:51:55 PM ******/
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
/****** Object:  StoredProcedure [dbo].[AddVoucher]    Script Date: 2/24/2021 8:51:55 PM ******/
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
/****** Object:  StoredProcedure [dbo].[DeleteAllImagesPostByPostID]    Script Date: 2/24/2021 8:51:55 PM ******/
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
/****** Object:  StoredProcedure [dbo].[DeleteImagePostByImageID]    Script Date: 2/24/2021 8:51:55 PM ******/
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
/****** Object:  StoredProcedure [dbo].[DeleteMailContentByCode]    Script Date: 2/24/2021 8:51:55 PM ******/
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
/****** Object:  StoredProcedure [dbo].[DeleteMailContentByID]    Script Date: 2/24/2021 8:51:55 PM ******/
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
/****** Object:  StoredProcedure [dbo].[DeleteOTP]    Script Date: 2/24/2021 8:51:55 PM ******/
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
/****** Object:  StoredProcedure [dbo].[getBalanceByAccountID]    Script Date: 2/24/2021 8:51:55 PM ******/
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
/****** Object:  StoredProcedure [dbo].[GetImagePostByID]    Script Date: 2/24/2021 8:51:55 PM ******/
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
/****** Object:  StoredProcedure [dbo].[GetImagesOfPostByPostID]    Script Date: 2/24/2021 8:51:55 PM ******/
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
/****** Object:  StoredProcedure [dbo].[GetMailContentByCode]    Script Date: 2/24/2021 8:51:55 PM ******/
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
/****** Object:  StoredProcedure [dbo].[GetMailContentByID]    Script Date: 2/24/2021 8:51:55 PM ******/
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
/****** Object:  StoredProcedure [dbo].[GetProfileByAccountID]    Script Date: 2/24/2021 8:51:55 PM ******/
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
/****** Object:  StoredProcedure [dbo].[GetProfileByEmail]    Script Date: 2/24/2021 8:51:55 PM ******/
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
/****** Object:  StoredProcedure [dbo].[GetProfileByPhone]    Script Date: 2/24/2021 8:51:55 PM ******/
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
    	INNER JOIN dbo.Role ON Role.Id = AccountRole.Id
    	WHERE Phone = @phone
    END
GO
/****** Object:  StoredProcedure [dbo].[GetProfileByUsername]    Script Date: 2/24/2021 8:51:55 PM ******/
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
/****** Object:  StoredProcedure [dbo].[getTransactionHistoryByAccountID]    Script Date: 2/24/2021 8:51:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[getTransactionHistoryByAccountID]
@AccountID int
AS
BEGIN
SELECT trans.Id TransactionId, accLogs.BeforeBalance, accLogs.AfterBalance, trans.Amount, trans.[Type] TypeID, trans.[Date] TransactionTime, trans.AdminId, accLogs.AccountId
From AccountLogs accLogs, Transactions trans
Where accLogs.TransactionId =trans.Id and accLogs.AccountID=@AccountID
ORDER BY trans.[Date] DESC
END;
GO
/****** Object:  StoredProcedure [dbo].[GetUserByUserName]    Script Date: 2/24/2021 8:51:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetUserByUserName] @Username nvarchar(50)
AS
	SELECT * FROM Account c WHERE c.UserName = @Username
GO
/****** Object:  StoredProcedure [dbo].[GetUserWithRoleByEmail]    Script Date: 2/24/2021 8:51:55 PM ******/
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
/****** Object:  StoredProcedure [dbo].[GetUserWithRoleByPhone]    Script Date: 2/24/2021 8:51:55 PM ******/
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
/****** Object:  StoredProcedure [dbo].[GetUserWithRoleByUserName]    Script Date: 2/24/2021 8:51:55 PM ******/
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
/****** Object:  StoredProcedure [dbo].[getVoucherByAccountID]    Script Date: 2/24/2021 8:51:55 PM ******/
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
/****** Object:  StoredProcedure [dbo].[getVoucherDetailByAccountId]    Script Date: 2/24/2021 8:51:55 PM ******/
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
/****** Object:  StoredProcedure [dbo].[topUpForAccount]    Script Date: 2/24/2021 8:51:55 PM ******/
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
/****** Object:  StoredProcedure [dbo].[UpdateImagePostByID]    Script Date: 2/24/2021 8:51:55 PM ******/
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
/****** Object:  StoredProcedure [dbo].[updateProfileByAccountID]    Script Date: 2/24/2021 8:51:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[updateProfileByAccountID]
(@accountID int, @firstName nvarchar(50), @lastName nvarchar(50), @gender bit, @dob date, @email nvarchar(50), @phone nvarchar(50), @address nvarchar(max), @avatar nvarchar(max) )
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
      ,[Avatar] = @avatar
 WHERE AccountId = @accountID
END;
GO
/****** Object:  StoredProcedure [dbo].[UpdateUserPassword]    Script Date: 2/24/2021 8:51:55 PM ******/
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
INSERT INTO TransactionType([Id], [Name],[Description])
VALUES (1, 'Top Up Account', 'Top Up Account')
GO
USE [master]
GO
ALTER DATABASE [CapstonesFull] SET  READ_WRITE 
GO