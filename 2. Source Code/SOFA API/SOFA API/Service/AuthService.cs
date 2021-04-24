using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net.Mail;
using System.Security.Claims;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using SOFA_API.Common;
using SOFA_API.DAO;
using SOFA_API.DTO;
using SOFA_API.ViewModel;
using SOFA_API.ViewModel.Account;

namespace SOFA_API.Service
{
    public class AuthService
    {

        //private static AuthService instance;

        //public static AuthService Instance
        //{
        //    get
        //    {
        //        if (instance == null) instance = new AuthService();
        //        return instance;
        //    }
        //}

        public AuthService() { }

        public AuthService(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        /// <summary>
        /// add new account register from client
        /// </summary>
        /// <param name="accountViewModel">Data that client send to server</param>
        /// <returns>The response of request</returns>
        public AccountViewModelOut AddNewAccount(AccountViewModelIn loginViewModelIn)
        {
            AccountViewModelOut loginViewModelOut = new AccountViewModelOut();

            try
            {
                /*
                // verify code
                if (!VerificationService.Instance.VerifyCode(loginViewModelIn.TransactionId, loginViewModelIn.Code))
                {
                    loginViewModelOut.Code = Const.REQUEST_CODE_FAILED;
                    throw new Exception("Invalid code");
                }
                */
                if (loginViewModelIn.IsApplicationAccess)
                {
                    loginViewModelIn.RoleId = Const.USER_ROLE_ID;
                }
                else
                {
                    loginViewModelIn.RoleId = Const.ADMIN_ROLE_ID;
                }

                loginViewModelIn.DateCreated = DateTime.Now;

                int result = AccountDAO.Instance.AddAccount(AccountValidation(loginViewModelIn));

                if (result > 0)
                {
                    loginViewModelOut.Code = Const.REQUEST_CODE_SUCCESSFULLY;
                    loginViewModelOut.Username = loginViewModelIn.Username;
                }

                loginViewModelOut.Email = loginViewModelIn.Email;
                loginViewModelOut.Phone = loginViewModelIn.Phone;
                loginViewModelOut.RoleId = loginViewModelIn.RoleId;
                loginViewModelOut.IsActive = true;
                loginViewModelOut.Firstname = loginViewModelIn.Firstname;
                loginViewModelOut.Lastname = loginViewModelIn.Lastname;

                return loginViewModelOut;
            }
            catch (Exception e)
            {
                loginViewModelOut.Code = Const.REQUEST_CODE_FAILED;
                loginViewModelOut.ErrorMessage = e.Message;
                return loginViewModelOut;
            }

        }

        /// <summary>
        /// validate infomation send from client for register new account
        /// </summary>
        /// <param name="accountViewModel">Data that client send to server</param>
        /// <returns>valid information</returns>
        public AccountViewModelIn AccountValidation(AccountViewModelIn loginViewModelIn)
        {
            // check username is not null
            if (!string.IsNullOrEmpty(loginViewModelIn.Username))
            {
                // check username is exist
                AccountViewModelOut account = AccountDAO.Instance.GetUserWithRoleByUserName(loginViewModelIn.Username);
                if (account == null)
                {
                    //check password is not null and length >= 6
                    if (!string.IsNullOrEmpty(loginViewModelIn.Password) && loginViewModelIn.Password.Length >= 6)
                    {
                        loginViewModelIn.Password = HashPassword(loginViewModelIn.Password);
                    }
                    else
                    {
                        throw new Exception("Mật khẩu bao gồm 6 ký tự trở lên");
                    }
                    // check valid email
                    if (!IsValidEmail(loginViewModelIn.Email))
                    {
                        throw new Exception("Email đã tồn tại");

                    }
                    // check phone number
                    if (!IsValidPhone(loginViewModelIn.Phone))
                    {
                        throw new Exception("Số điện thoại đã tồn tại");
                    }
                    // check firstname
                    if (string.IsNullOrEmpty(loginViewModelIn.Firstname))
                    {
                        throw new Exception("Tên không được để trống");
                    }
                    // check lastname
                    if (string.IsNullOrEmpty(loginViewModelIn.Lastname))
                    {
                        throw new Exception("Họ không được để trống");
                    }
                }
                else
                    throw new Exception("Tài khoản đã tồn tại");
            }
            return loginViewModelIn;
        }

        /// <summary>
        /// hash password send from client
        /// </summary>
        /// <param name="password"the password send from client></param>
        /// <returns>hashed password string</returns>
        public string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }

        /// <summary>
        /// verify the password send from client with hashed password
        /// </summary>
        /// <param name="password">he password send from client</param>
        /// <param name="hashedPassword">the code hashed get from db</param>
        /// <returns>true/false</returns>
        public bool VerifyPassword(string password, string hashedPassword)
        {
            return BCrypt.Net.BCrypt.Verify(password, hashedPassword);
        }

        /// <summary>
        /// validate the email address
        /// </summary>
        /// <param name="emailaddress">email that send from client</param>
        /// <returns>true/false</returns>
        public bool IsValidEmail(string emailAddress)
        {
            try
            {
                AccountViewModelOut account = AccountDAO.Instance.GetUserWithRoleByEmail(emailAddress);
                if (account != null)
                {
                    throw new Exception("Email đã tồn tại");
                }

                var addr = new MailAddress(emailAddress);
                return addr.Address == emailAddress;
            }
            catch (FormatException)
            {
                return false;
            }
        }
        /// <summary>
        /// validate phone number
        /// </summary>
        /// <param name="phone">phone that send from client</param>
        /// <returns>true/false</returns>
        public bool IsValidPhone(string phone)
        {
            AccountViewModelOut account = AccountDAO.Instance.GetUserWithRoleByPhone(phone);
            if (account != null)
            {
                return false;
            }
            return true;
        }

        /// <summary>
        /// generate token to authorize
        /// </summary>
        /// <param name="accountViewModel">Data that client send to server</param>
        /// <returns>The response of request</returns>
        public AccountViewModelOut GetToken(AccountViewModelIn loginViewModelIn)
        {
            AccountViewModelOut loginViewModelOut = new AccountViewModelOut();
            try
            {
                if (!string.IsNullOrEmpty(loginViewModelIn.Username) && !string.IsNullOrEmpty(loginViewModelIn.Password))
                {
                    AccountViewModelOut account = AccountDAO.Instance.GetUserWithRoleByUserName(loginViewModelIn.Username);
                    if (account != null && account.IsActive == false)
                    {
                        throw new Exception("Tên tài khoản đã bị khóa");
                    }
                    // check username and status
                    if (account != null && account.IsActive)
                    {
                        // check ignore case
                        if (!loginViewModelIn.Username.Equals(account.Username))
                        {
                            throw new Exception("Tên tài khoản hoặc mật khẩu không đúng");
                        }

                        // check password
                        if (!VerifyPassword(loginViewModelIn.Password, account.Password))
                        {
                            throw new Exception("Tên tài khoản hoặc mật khẩu không đúng");
                        }

                        // check admin login in app
                        if (loginViewModelIn.IsApplicationAccess && account.RoleId == Const.ADMIN_ROLE_ID)
                        {
                            throw new Exception("Tên tài khoản hoặc mật khẩu không đúng");
                        }

                        // check admin login
                        if (!loginViewModelIn.IsApplicationAccess && account.RoleId != Const.ADMIN_ROLE_ID)
                        {
                            throw new Exception("Bạn không có quyền truy cập vào trang này");
                        }

                        // security key
                        string securityKey = Configuration["JWT:SecretKey"];

                        // symmetric security key
                        var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(securityKey));

                        // signing credentials
                        var signingCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256Signature);

                        //add claims
                        var claims = new List<Claim>();
                        claims.Add(new Claim(ClaimTypes.Role, account.RoleName));
                        claims.Add(new Claim("ID", account.Id.ToString()));
                        claims.Add(new Claim("Username", account.Username.ToString()));

                        // create token
                        var token = new JwtSecurityToken(
                            issuer: Configuration["JWT:Issuser"],
                            audience: Configuration["JWT:Audience"],
                            expires: DateTime.Now.AddDays(30),
                            signingCredentials: signingCredentials,
                            claims: claims
                        );

                        loginViewModelOut = account;

                        // return
                        loginViewModelOut.Token = new JwtSecurityTokenHandler().WriteToken(token);
                        loginViewModelOut.Password = null;
                        loginViewModelOut.Code = Const.REQUEST_CODE_SUCCESSFULLY;

                        return loginViewModelOut;
                    }
                    else
                    {
                        throw new Exception("Tên tài khoản hoặc mật khẩu không đúng");
                    }
                }
                else
                {
                    throw new Exception("Nhập tên tài khoản và mật khẩu");
                }
            }
            catch (Exception e)
            {
                loginViewModelOut.Code = Const.REQUEST_CODE_FAILED;
                loginViewModelOut.ErrorMessage = e.Message;
                return loginViewModelOut;
            }
        }
        /// <summary>
        /// chang the password of user
        /// </summary>
        /// <param name="loginViewModelIn">Data that client send to server</param>
        /// <returns>The response of request</returns>
        public AccountViewModelOut ResetPassword(AccountViewModelIn loginViewModelIn)
        {
            AccountViewModelOut loginViewModelOut = new AccountViewModelOut();

            try
            {
                // check after reset pw resquest
                if (loginViewModelIn.IsAfterReset)
                {
                    // verify code
                    //if (!VerificationService.Instance.VerifyCode(loginViewModelIn.TransactionId, loginViewModelIn.Code))
                    //{
                    //    loginViewModelOut.Code = Const.REQUEST_CODE_FAILED;
                    //    throw new Exception("Code không hợp lệ");
                    //}

                    if (!string.IsNullOrEmpty(loginViewModelIn.NewPassword) && loginViewModelIn.NewPassword.Length >= 6)
                    {
                        loginViewModelIn.NewPassword = HashPassword(loginViewModelIn.NewPassword);
                    }
                    else
                    {
                        throw new Exception("Mật khẩu bao gồm 6 ký tự trở lên");
                    }
                }

                if (!string.IsNullOrEmpty(loginViewModelIn.Phone))
                {
                    // check account
                    AccountViewModelOut account = AccountDAO.Instance.GetUserWithRoleByPhone(loginViewModelIn.Phone);

                    if (account != null)
                    {
                        loginViewModelIn.Username = account.Username;
                        // check current request is change pw
                        if (!string.IsNullOrEmpty(loginViewModelIn.Password))
                        {
                            if (!VerifyPassword(loginViewModelIn.Password, account.Password))
                            {
                                throw new Exception("Sai mật khẩu");
                            }
                            if (loginViewModelIn.Password == loginViewModelIn.NewPassword)
                            {
                                throw new Exception("Mật khẩu mới không được trùng với mật khẩu cũ");
                            }

                            if (!string.IsNullOrEmpty(loginViewModelIn.NewPassword) && loginViewModelIn.NewPassword.Length >= 6)
                            {
                                loginViewModelIn.NewPassword = HashPassword(loginViewModelIn.NewPassword);
                            }
                            else
                            {
                                throw new Exception("Mật khẩu bao gồm 6 ký tự trở lên");
                            }
                        }
                    }
                    else
                    {
                        throw new Exception("Số điện thoại không hợp lệ");
                    }
                }
                else
                {
                    throw new Exception("Nhập số điện thoại");
                }

                // update
                AccountDAO.Instance.UpdateUserPassword(loginViewModelIn.Username, loginViewModelIn.NewPassword);
                loginViewModelOut.Code = Const.REQUEST_CODE_SUCCESSFULLY;
                loginViewModelOut.Username = loginViewModelIn.Username;

                return loginViewModelOut;
            }
            catch (Exception e)
            {
                loginViewModelOut.Code = Const.REQUEST_CODE_FAILED;
                loginViewModelOut.ErrorMessage = e.Message;
                return loginViewModelOut;
            }
        }

        public AccountViewModelOut GoogleAuthentication(string tokenId)
        {
            AccountViewModelOut accountViewModelOut = new AccountViewModelOut();

            try
            {
                if (!string.IsNullOrEmpty(tokenId))
                {
                    var googleUser = GoogleJsonWebSignature.ValidateAsync(tokenId, new GoogleJsonWebSignature.ValidationSettings()).Result;
                    AccountViewModelOut account = AccountDAO.Instance.GetUserWithRoleByEmail(googleUser.Email);

                    if (account == null)
                    {
                        throw new Exception("Email chưa được đăng ký");
                    }
                    else
                    {
                        accountViewModelOut = account;
                    }

                    // security key
                    string securityKey = Configuration["JWT:SecretKey"];

                    // symmetric security key
                    var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(securityKey));

                    // signing credentials
                    var signingCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256Signature);

                    //add claims
                    var claims = new List<Claim>();
                    claims.Add(new Claim(ClaimTypes.Role, accountViewModelOut.RoleName));
                    claims.Add(new Claim("ID", accountViewModelOut.Id.ToString()));
                    claims.Add(new Claim("Username", accountViewModelOut.Username.ToString()));

                    // create token
                    var token = new JwtSecurityToken(
                        issuer: Configuration["JWT:Issuser"],
                        audience: Configuration["JWT:Audience"],
                        expires: DateTime.Now.AddDays(30),
                        signingCredentials: signingCredentials,
                        claims: claims
                    );

                    // return
                    accountViewModelOut.Token = new JwtSecurityTokenHandler().WriteToken(token);
                    accountViewModelOut.Password = null;
                    accountViewModelOut.Code = Const.REQUEST_CODE_SUCCESSFULLY;
                }
            }
            catch (Exception e)
            {
                accountViewModelOut.Code = Const.REQUEST_CODE_FAILED;
                accountViewModelOut.ErrorMessage = e.Message;
                return accountViewModelOut;
            }

            return accountViewModelOut;
        }

        public AccountViewModelOut AddNewStaff(AccountViewModelIn loginViewModelIn)
        {
            AccountViewModelOut loginViewModelOut = new AccountViewModelOut();

            try
            {
                /*
                // verify code
                if (!VerificationService.Instance.VerifyCode(loginViewModelIn.TransactionId, loginViewModelIn.Code))
                {
                    loginViewModelOut.Code = Const.REQUEST_CODE_FAILED;
                    throw new Exception("Invalid code");
                }
                */
                if (loginViewModelIn.IsApplicationAccess)
                {
                    loginViewModelIn.RoleId = Const.USER_ROLE_ID;
                }
                else
                {
                    loginViewModelIn.RoleId = Const.ADMIN_ROLE_ID;
                }

                loginViewModelIn.DateCreated = DateTime.Now;

                if (!string.IsNullOrEmpty(loginViewModelIn.Username))
                {
                    // check username is exist
                    AccountViewModelOut account = AccountDAO.Instance.GetUserWithRoleByUserName(loginViewModelIn.Username);
                    if (account == null)
                    {
                        //check password is not null and length >= 6
                        if (!string.IsNullOrEmpty(loginViewModelIn.Password) && loginViewModelIn.Password.Length >= 6)
                        {
                            loginViewModelIn.Password = HashPassword(loginViewModelIn.Password);
                        }
                        else
                        {
                            throw new Exception("Mật khẩu bao gồm 6 ký tự trở lên");
                        }
                        // check firstname
                        if (string.IsNullOrEmpty(loginViewModelIn.Firstname))
                        {
                            throw new Exception("Tên không được để trống");
                        }
                        // check lastname
                        if (string.IsNullOrEmpty(loginViewModelIn.Lastname))
                        {
                            throw new Exception("Họ không được để trống");
                        }
                    }
                    else
                        throw new Exception("Tài khoản đã tồn tại");
                }

                int result = AccountDAO.Instance.AddNewStaff(loginViewModelIn);

                if (result > 0)
                {
                    loginViewModelOut.Code = Const.REQUEST_CODE_SUCCESSFULLY;
                    loginViewModelOut.Username = loginViewModelIn.Username;
                }

                loginViewModelOut.RoleId = loginViewModelIn.RoleId;

                return loginViewModelOut;
            }
            catch (Exception e)
            {
                loginViewModelOut.Code = Const.REQUEST_CODE_FAILED;
                loginViewModelOut.ErrorMessage = e.Message;
                return loginViewModelOut;
            }

        }
        public AccountViewModelOut AdminResetPassword(int accountId)
        {
            AccountViewModelOut loginViewModelOut = new AccountViewModelOut();

            try
            {
                AccountViewModelIn loginViewModelIn = new AccountViewModelIn();
                if (accountId != 0)
                {
                    // check account
                    AccountViewModelOut account = AccountDAO.Instance.GetUserById(accountId);

                    if (account != null)
                    {

                        loginViewModelIn.Username = account.Username;
                        loginViewModelIn.NewPassword = HashPassword("123456");
                        loginViewModelIn.Email = account.Email;
                        loginViewModelIn.Firstname = account.Firstname;
                        loginViewModelIn.Lastname = account.Lastname;
                    }
                    else
                    {
                        throw new Exception("Account không tồn tại");
                    }
                }
                else
                {
                    throw new Exception("Account id không hợp lệ");
                }

                // update
                AccountDAO.Instance.UpdateUserPassword(loginViewModelIn.Username, loginViewModelIn.NewPassword);
                Utils.Instance.SendMail(loginViewModelIn.Email, "SOFA - Thay đổi mật khẩu", "<b>Xin chào " + loginViewModelIn.Firstname + " " + loginViewModelIn.Lastname + ",</b><br><p> Mật khẩu của bạn đã được reset về mặc định</p>" +
                    "<p>Dưới đây là mật khẩu mặc định của bạn. Để đảm bảo an toàn, vui lòng không cung cấp mật khẩu cho bất kỳ ai khác.</p>" +
                    "<p> Mật khẩu mặc định là: <b> 123456 </b> </p><p> Để tăng cường bảo mật, vui lòng truy cập lại SOFA để đổi lại mật khẩu của bạn </p>" +
                    "SOFA team,");
                loginViewModelOut.Code = Const.REQUEST_CODE_SUCCESSFULLY;
                loginViewModelOut.Username = loginViewModelIn.Username;

                return loginViewModelOut;
            }
            catch (Exception e)
            {
                loginViewModelOut.Code = Const.REQUEST_CODE_FAILED;
                loginViewModelOut.ErrorMessage = e.Message;
                return loginViewModelOut;
            }
        }

        public AccountViewModelOut AdminChangePassword(AccountViewModelIn loginViewModelIn)
        {
            AccountViewModelOut loginViewModelOut = new AccountViewModelOut();

            try
            {
                AccountViewModelOut account = AccountDAO.Instance.GetUserWithRoleByUserName(loginViewModelIn.Username);
                // check username and status
                if (account != null)
                {
                    // check password
                    if (!VerifyPassword(loginViewModelIn.Password, account.Password))
                    {
                        throw new Exception("Tên tài khoản hoặc mật khẩu không đúng");
                    }
                    if (!string.IsNullOrEmpty(loginViewModelIn.NewPassword) && loginViewModelIn.NewPassword.Length >= 6)
                    {
                        loginViewModelIn.NewPassword = HashPassword(loginViewModelIn.NewPassword);
                    }
                    else
                    {
                        throw new Exception("Mật khẩu bao gồm 6 ký tự trở lên");
                    }

                    // update
                    AccountDAO.Instance.UpdateUserPassword(loginViewModelIn.Username, loginViewModelIn.NewPassword);
                    loginViewModelOut.Code = Const.REQUEST_CODE_SUCCESSFULLY;
                    loginViewModelOut.Username = loginViewModelIn.Username;
                } else
                {
                    throw new Exception("Account không tồn tại");
                }
                return loginViewModelOut;
            }
            catch (Exception e)
            {
                loginViewModelOut.Code = Const.REQUEST_CODE_FAILED;
                loginViewModelOut.ErrorMessage = e.Message;
                return loginViewModelOut;
            }
        }
    }
}
