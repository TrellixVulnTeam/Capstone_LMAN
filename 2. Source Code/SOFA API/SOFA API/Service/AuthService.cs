using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net.Mail;
using System.Security.Claims;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
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
                // else - TODO


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
        private AccountViewModelIn AccountValidation(AccountViewModelIn loginViewModelIn)
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
                        throw new Exception("Password must contain at least 6 digits");
                    }
                    // check valid email
                    if (!IsValidEmail(loginViewModelIn.Email))
                    {
                        throw new Exception("Email address is invalid or already exists");

                    }
                    // check phone number
                    if (!IsValidPhone(loginViewModelIn.Phone))
                    {
                        throw new Exception("Phone number is already exists");
                    }
                }
                else
                    throw new Exception("Username is exist");
            }
            return loginViewModelIn;
        }

        /// <summary>
        /// hash password send from client
        /// </summary>
        /// <param name="password"the password send from client></param>
        /// <returns>hashed password string</returns>
        private string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }

        /// <summary>
        /// verify the password send from client with hashed password
        /// </summary>
        /// <param name="password">he password send from client</param>
        /// <param name="hashedPassword">the code hashed get from db</param>
        /// <returns>true/false</returns>
        private bool VerifyPassword(string password, string hashedPassword)
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
                    throw new Exception("Email address is already exists");
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
                    // check username and status
                    if (account != null && account.IsActive)
                    {
                        // check password
                        if (!VerifyPassword(loginViewModelIn.Password, account.Password))
                        {
                            throw new Exception("Incorrect username or password");
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
                        throw new Exception("Incorrect username or password");
                    }
                }
                else
                {
                    throw new Exception("Username and password must not be empty");
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
                    if (!VerificationService.Instance.VerifyCode(loginViewModelIn.TransactionId, loginViewModelIn.Code))
                    {
                        loginViewModelOut.Code = Const.REQUEST_CODE_FAILED;
                        throw new Exception("Invalid code");
                    }

                    if (!string.IsNullOrEmpty(loginViewModelIn.NewPassword) && loginViewModelIn.NewPassword.Length >= 6)
                    {
                        loginViewModelIn.NewPassword = HashPassword(loginViewModelIn.NewPassword);
                    }
                    else
                    {
                        throw new Exception("Password must contain at least 6 digits");
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
                                throw new Exception("Wrong password");
                            }
                            if (loginViewModelIn.Password == loginViewModelIn.NewPassword)
                            {
                                throw new Exception("New password must be different from old");
                            }

                            if (!string.IsNullOrEmpty(loginViewModelIn.NewPassword) && loginViewModelIn.NewPassword.Length >= 6)
                            {
                                loginViewModelIn.NewPassword = HashPassword(loginViewModelIn.NewPassword);
                            }
                            else
                            {
                                throw new Exception("Password must contain at least 6 digits");
                            }
                        }
                    }
                    else
                    {
                        throw new Exception("Phone number is invalid");
                    }
                }
                else
                {
                    throw new Exception("Phone number is empty");
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
    }
}
