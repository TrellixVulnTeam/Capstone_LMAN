USE [master]
GO
/****** Object:  Database [CapstonesFull]    Script Date: 1/26/2021 12:33:39 AM ******/
CREATE DATABASE [CapstonesFull]

GO
USE [CapstonesFull]
GO
/****** Object:  Table [dbo].[Account]    Script Date: 1/26/2021 12:33:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Account](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserName] [nvarchar](50) NOT NULL,
	[Password] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_Account] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AccountLogs]    Script Date: 1/26/2021 12:33:39 AM ******/
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
/****** Object:  Table [dbo].[AccountRelation]    Script Date: 1/26/2021 12:33:39 AM ******/
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
/****** Object:  Table [dbo].[AccountRole]    Script Date: 1/26/2021 12:33:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AccountRole](
	[AccountId] [int] NOT NULL,
	[RoleId] [int] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ActionType]    Script Date: 1/26/2021 12:33:39 AM ******/
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
/****** Object:  Table [dbo].[Comment]    Script Date: 1/26/2021 12:33:39 AM ******/
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
/****** Object:  Table [dbo].[Conversation]    Script Date: 1/26/2021 12:33:39 AM ******/
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
/****** Object:  Table [dbo].[Image]    Script Date: 1/26/2021 12:33:39 AM ******/
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
/****** Object:  Table [dbo].[Info]    Script Date: 1/26/2021 12:33:39 AM ******/
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
/****** Object:  Table [dbo].[Like]    Script Date: 1/26/2021 12:33:39 AM ******/
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
/****** Object:  Table [dbo].[MarkUpPost]    Script Date: 1/26/2021 12:33:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MarkUpPost](
	[PostId] [int] NOT NULL,
	[AccountId] [int] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Message]    Script Date: 1/26/2021 12:33:39 AM ******/
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
/****** Object:  Table [dbo].[Notification]    Script Date: 1/26/2021 12:33:39 AM ******/
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
/****** Object:  Table [dbo].[Post]    Script Date: 1/26/2021 12:33:39 AM ******/
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
/****** Object:  Table [dbo].[Privacy]    Script Date: 1/26/2021 12:33:39 AM ******/
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
/****** Object:  Table [dbo].[Profile]    Script Date: 1/26/2021 12:33:39 AM ******/
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
 CONSTRAINT [PK_Profile] PRIMARY KEY CLUSTERED 
(
	[AccountId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Rate]    Script Date: 1/26/2021 12:33:39 AM ******/
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
/****** Object:  Table [dbo].[Reason]    Script Date: 1/26/2021 12:33:39 AM ******/
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
/****** Object:  Table [dbo].[RelationType]    Script Date: 1/26/2021 12:33:39 AM ******/
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
/****** Object:  Table [dbo].[Report]    Script Date: 1/26/2021 12:33:39 AM ******/
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
/****** Object:  Table [dbo].[ReportReason]    Script Date: 1/26/2021 12:33:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ReportReason](
	[ReportId] [int] NOT NULL,
	[ReasonId] [int] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ReportType]    Script Date: 1/26/2021 12:33:39 AM ******/
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
/****** Object:  Table [dbo].[Role]    Script Date: 1/26/2021 12:33:39 AM ******/
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
/****** Object:  Table [dbo].[Transactions]    Script Date: 1/26/2021 12:33:39 AM ******/
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
/****** Object:  Table [dbo].[TransactionType]    Script Date: 1/26/2021 12:33:39 AM ******/
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
/****** Object:  Table [dbo].[TypeNotification]    Script Date: 1/26/2021 12:33:39 AM ******/
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
ALTER TABLE [dbo].[Account]  WITH CHECK ADD  CONSTRAINT [FK_Account_Profile] FOREIGN KEY([Id])
REFERENCES [dbo].[Profile] ([AccountId])
GO
ALTER TABLE [dbo].[Account] CHECK CONSTRAINT [FK_Account_Profile]
GO
ALTER TABLE [dbo].[AccountLogs]  WITH CHECK ADD  CONSTRAINT [FK_AccountLogs_Account] FOREIGN KEY([Accontid])
REFERENCES [dbo].[Account] ([Id])
GO
ALTER TABLE [dbo].[AccountLogs] CHECK CONSTRAINT [FK_AccountLogs_Account]
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
ALTER TABLE [dbo].[AccountRole]  WITH CHECK ADD  CONSTRAINT [FK_AccountRole_Role] FOREIGN KEY([AccountId])
REFERENCES [dbo].[Role] ([Id])
GO
ALTER TABLE [dbo].[AccountRole] CHECK CONSTRAINT [FK_AccountRole_Role]
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
ALTER TABLE [dbo].[Notification]  WITH CHECK ADD  CONSTRAINT [FK_Notification_ActionType] FOREIGN KEY([TypeAction])
REFERENCES [dbo].[ActionType] ([Id])
GO
ALTER TABLE [dbo].[Notification] CHECK CONSTRAINT [FK_Notification_ActionType]
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
ALTER TABLE [dbo].[Post]  WITH CHECK ADD  CONSTRAINT [FK_Post_Image] FOREIGN KEY([Id])
REFERENCES [dbo].[Image] ([PostId])
GO
ALTER TABLE [dbo].[Post] CHECK CONSTRAINT [FK_Post_Image]
GO
ALTER TABLE [dbo].[Post]  WITH CHECK ADD  CONSTRAINT [FK_Post_Privacy] FOREIGN KEY([PrivacyID])
REFERENCES [dbo].[Privacy] ([Id])
GO
ALTER TABLE [dbo].[Post] CHECK CONSTRAINT [FK_Post_Privacy]
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
ALTER TABLE [dbo].[Transactions]  WITH CHECK ADD  CONSTRAINT [FK_Transactions_Account] FOREIGN KEY([FromAccountId])
REFERENCES [dbo].[Account] ([Id])
GO
ALTER TABLE [dbo].[Transactions] CHECK CONSTRAINT [FK_Transactions_Account]
GO
ALTER TABLE [dbo].[Transactions]  WITH CHECK ADD  CONSTRAINT [FK_Transactions_Account1] FOREIGN KEY([ToAccountId])
REFERENCES [dbo].[Account] ([Id])
GO
ALTER TABLE [dbo].[Transactions] CHECK CONSTRAINT [FK_Transactions_Account1]
GO
ALTER TABLE [dbo].[Transactions]  WITH CHECK ADD  CONSTRAINT [FK_Transactions_TransactionType] FOREIGN KEY([TransactionType])
REFERENCES [dbo].[TransactionType] ([Id])
GO
ALTER TABLE [dbo].[Transactions] CHECK CONSTRAINT [FK_Transactions_TransactionType]
GO
USE [master]
GO
ALTER DATABASE [CapstonesFull] SET  READ_WRITE 
GO
