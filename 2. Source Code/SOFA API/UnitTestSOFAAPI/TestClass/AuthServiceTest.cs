using Microsoft.VisualStudio.TestTools.UnitTesting;
using SOFA_API.Common;
using SOFA_API.Service;
using SOFA_API.ViewModel.Account;
using System;
using System.Collections.Generic;
using System.Text;

namespace UnitTestSOFAAPI.TestClass
{
    [TestClass]
    public class AuthServiceTest
    {
        private AuthService _authService = new AuthService();

        [TestMethod]
        public void AccountValidation_ShouldReturnModelIn_IfAllInputValid()
        {
            // arrange
            var expectedResult = new AccountViewModelIn("Username", "123456", "", "123@gmail.com", "1233451231", true, 1, 1, true,
                1, "Tung", "nguyen");

            // Act
            var result = _authService.AccountValidation(expectedResult);

            // assert
            Assert.AreEqual(expectedResult.Username, result.Username);
            Assert.AreEqual(expectedResult.Email, result.Email);
            Assert.AreEqual(expectedResult.Phone, result.Phone);
            Assert.AreEqual(expectedResult.Firstname, result.Firstname);
            Assert.AreEqual(expectedResult.Lastname, result.Lastname);
        }

        [TestMethod]
        public void AccountValidation_ShouldThrowNewException_IfUsernameExist()
        {
            try
            {
                // arrange
                var expectedResult = new AccountViewModelIn("dunghv", "123456", "", "123@gmail.com", "1233451231", true, 1, 1, true,
                1, "Tung", "nguyen");

                // Act
                var result = _authService.AccountValidation(expectedResult);
            }
            catch (Exception ex)
            {
                // assert
                Assert.AreEqual(ex.Message, "Tài khoản đã tồn tại");
            }
        }

        [TestMethod]
        public void AccountValidation_ShouldThrowNewException_IfPasswordLessThan6Characters()
        {
            try
            {
                // arrange
                var expectedResult = new AccountViewModelIn("123asd", "123", "", "123@gmail.com", "1233451231", true, 1, 1, true,
                1, "Tung", "nguyen");

                // Act
                var result = _authService.AccountValidation(expectedResult);
            }
            catch (Exception ex)
            {
                // assert
                Assert.AreEqual(ex.Message, "Mật khẩu bao gồm 6 ký tự trở lên");
            }
        }

        [TestMethod]
        public void AccountValidation_ShouldThrowNewException_IfEmailExisit()
        {
            try
            {
                // arrange
                var expectedResult = new AccountViewModelIn("123asd", "123456", "", "asd@asd.com", "1233451231", true, 1, 1, true,
                1, "Tung", "nguyen");

                // Act
                var result = _authService.AccountValidation(expectedResult);
            }
            catch (Exception ex)
            {
                // assert
                Assert.AreEqual(ex.Message, "Email đã tồn tại");
            }
        }

        [TestMethod]
        public void AccountValidation_ShouldThrowNewException_IfPhoneExisit()
        {
            try
            {
                // arrange
                var expectedResult = new AccountViewModelIn("123asd", "123456", "", "asd12312@asd.com", "12345678910", true, 1, 1, true,
                1, "Tung", "nguyen");

                // Act
                var result = _authService.AccountValidation(expectedResult);
            }
            catch (Exception ex)
            {
                // assert
                Assert.AreEqual(ex.Message, "Số điện thoại đã tồn tại");
            }
        }

        [TestMethod]
        public void AccountValidation_ShouldThrowNewException_IfFirstNameIsEmpty()
        {
            try
            {
                // arrange
                var expectedResult = new AccountViewModelIn("123asd", "123456", "", "asd12312@asd.com", "12345678999", true, 1, 1, true,
                1, "", "nguyen");

                // Act
                var result = _authService.AccountValidation(expectedResult);
            }
            catch (Exception ex)
            {
                // assert
                Assert.AreEqual(ex.Message, "Tên không được để trống");
            }
        }

        [TestMethod]
        public void AccountValidation_ShouldThrowNewException_IfLastnameIsEmpty()
        {
            try
            {
                // arrange
                var expectedResult = new AccountViewModelIn("123asd", "123456", "", "asd12312@asd.com", "12345678999", true, 1, 1, true,
                1, "Tung", "");

                // Act
                var result = _authService.AccountValidation(expectedResult);
            }
            catch (Exception ex)
            {
                // assert
                Assert.AreEqual(ex.Message, "Họ không được để trống");
            }
        }

        [TestMethod]
        public void HashPassword_ShouldReturnAStringToken()
        {
            // arrange
            string password = "123456";

            // Act
            var result = _authService.HashPassword(password);

            // assert
            Assert.IsNotNull(result);
            Assert.IsTrue(result.Length > 0);
        }

        [TestMethod]
        public void HashPassword_ShouldReturnStringToken()
        {
            // arrange
            string password = "tungbin";

            // Act
            var result = _authService.HashPassword(password);

            // assert
            Assert.IsNotNull(result);
            Assert.IsTrue(result.Length > 0);
        }

        [TestMethod]
        public void VerifyPassword_ShouldReturnTrueIfPasswordIsMatched()
        {
            // arrange
            string password = "123456";
            string hashedPassword = _authService.HashPassword(password);

            // Act
            var result = _authService.VerifyPassword(password, hashedPassword);

            // assert
            Assert.IsTrue(result);
            Assert.AreEqual(true, result);
        }

        [TestMethod]
        public void VerifyPassword_ShouldReturnTrue()
        {
            // arrange
            string password = "tungbin";
            string hashedPassword = _authService.HashPassword(password);

            // Act
            var result = _authService.VerifyPassword(password, hashedPassword);

            // assert
            Assert.IsTrue(result);
            Assert.AreEqual(true, result);
        }

        [TestMethod]
        public void VerifyPassword_ShouldReturnFalseIfPasswordNotMatched()
        {
            // arrange
            string password = "123456";
            string hashedPassword = _authService.HashPassword(password);
            string otherPassword = "654321";

            // Act
            var result = _authService.VerifyPassword(otherPassword, hashedPassword);

            // assert
            Assert.IsFalse(result);
            Assert.AreEqual(false, result);
        }

        [TestMethod]
        public void IsvalidEmail_ShouldReturnTrueIfEmailNotExistAndValidFormat()
        {
            // arrange
            string email = "asdqwe@gmail.com";

            // Act
            var result = _authService.IsValidEmail(email);

            // assert
            Assert.IsTrue(result);
            Assert.AreEqual(true, result);
        }

        [TestMethod]
        public void IsvalidEmail_ShouldThrowNewException_IfIfEmailExist()
        {
            try
            {
                // arrange
                string email = "dunghvhe13@gmail.com";

                // Act
                var result = _authService.IsValidEmail(email);
            }
            catch (Exception ex)
            {
                // assert
                Assert.AreEqual(ex.Message, "Email đã tồn tại");
            }
        }

        [TestMethod]
        public void IsvalidEmail_ShouldReturnFalse_IfEmailIsInvalidFormat()
        {
            // arrange
            string email = "dunghvhe13";

            // Act
            var result = _authService.IsValidEmail(email);

            // assert
            Assert.AreEqual(false, result);
            Assert.IsFalse(result);
        }

        [TestMethod]
        public void IsValidPhone_ShouldReturnTrue_IfPhoneNotExist()
        {
            // arrange
            string phone = "0344266888";

            // act 
            var result = _authService.IsValidPhone(phone);

            // assert
            Assert.IsTrue(result);
            Assert.AreEqual(true, result);
        }

        [TestMethod]
        public void IsValidPhone_ShouldReturnFalse_IfPhoneExist()
        {
            // arrange
            string phone = "12345678910";

            // act 
            var result = _authService.IsValidPhone(phone);

            // assert
            Assert.IsFalse(result);
            Assert.AreEqual(false, result);
        }

        [TestMethod]
        public void GetToken_ShouldThrowNewException_IfUsernameIsEmpty()
        {

            try
            {
                // arrange
                AccountViewModelIn account = new AccountViewModelIn("", "123456", true);

                // assert
                var result = _authService.GetToken(account);
            }
            catch (Exception ex)
            {
                Assert.AreEqual(ex.Message, "Nhập tên tài khoản và mật khẩu");
            }
        }

        [TestMethod]
        public void GetToken_ShouldThrowNewException_IfPasswordIsEmpty()
        {

            try
            {
                // arrange
                AccountViewModelIn account = new AccountViewModelIn("Test123", "", true);

                // assert
                var result = _authService.GetToken(account);
            }
            catch (Exception ex)
            {
                Assert.AreEqual(ex.Message, "Nhập tên tài khoản và mật khẩu");
            }
        }

        [TestMethod]
        public void GetToken_ShouldThrowNewException_IfUserNameIsNotMatched()
        {

            try
            {
                // arrange
                AccountViewModelIn account = new AccountViewModelIn("Test1234", "123123", true);

                // assert
                var result = _authService.GetToken(account);
            }
            catch (Exception ex)
            {
                Assert.AreEqual(ex.Message, "Tên tài khoản hoặc mật khẩu không đúng");
            }
        }

        [TestMethod]
        public void GetToken_ShouldThrowNewException_IfPasswordUserLoginOnManagerPage()
        {

            try
            {
                // arrange
                AccountViewModelIn account = new AccountViewModelIn("Test123", "123456", false);

                // assert
                var result = _authService.GetToken(account);
            }
            catch (Exception ex)
            {
                Assert.AreEqual(ex.Message, "Bạn không có quyền truy cập vào trang này");
            }
        }

        [TestMethod]
        public void ResetPassword_ShouldReturnSuccessful_ValidInformation()
        {
            // arrange
            AccountViewModelIn account = new AccountViewModelIn("Test123", "123456", "654321", "1234567891", false);

            // assert
            var result = _authService.ResetPassword(account);

            // arrange
            Assert.AreEqual(Const.REQUEST_CODE_SUCCESSFULLY, result.Code);
            Assert.AreEqual(account.Username, result.Username);
        }

        [TestMethod]
        public void ResetPassword_ShouldThrowNewException_IfPhoneIsEmpty()
        {
            try
            {
                // arrange
                AccountViewModelIn account = new AccountViewModelIn("Test123", "123456", "654321", "", false);

                // assert
                var result = _authService.ResetPassword(account);
            }
            catch (Exception ex)
            {
                Assert.AreEqual(ex.Message, "Nhập số điện thoại");
            }
        }

        [TestMethod]
        public void ResetPassword_ShouldThrowNewException_IfPasswordIsNotMatched()
        {
            try
            {
                // arrange
                AccountViewModelIn account = new AccountViewModelIn("kakaka", "123333", "123123", "0832337028", false);

                // assert
                var result = _authService.ResetPassword(account);
            }
            catch (Exception ex)
            {
                Assert.AreEqual(ex.Message, "Sai mật khẩu");
            }
        }

        [TestMethod]
        public void ResetPassword_ShouldThrowNewException_IfPasswordIsDuplicate()
        {
            try
            {
                // arrange
                AccountViewModelIn account = new AccountViewModelIn("kakaka", "123456", "123456", "0832337028", false);

                // assert
                var result = _authService.ResetPassword(account);
            }
            catch (Exception ex)
            {
                Assert.AreEqual(ex.Message, "Mật khẩu mới không được trùng với mật khẩu cũ");
            }
        }

        [TestMethod]
        public void AddNewStaff_ShouldReturnSuccesfullyCode_IfValidInput()
        {
            // arrange 
            AccountViewModelIn loginViewModelIn = new AccountViewModelIn("staff123", "123456", "New", "staff");

            // Act 
            var result = _authService.AddNewStaff(loginViewModelIn);

            // Assert
            Assert.AreEqual(Const.REQUEST_CODE_SUCCESSFULLY, result.Code);
            Assert.AreEqual(loginViewModelIn.Username, result.Username);
        }

        [TestMethod]
        public void AddNewStaff_ShouldThrowNewException_IfUsernameExist()
        {
            try
            {
                // arrange
                AccountViewModelIn loginViewModelIn = new AccountViewModelIn("admin", "123456", "New", "staff");

                // Act
                var result = _authService.AddNewStaff(loginViewModelIn);
            }
            catch (Exception ex)
            {
                // assert
                Assert.AreEqual(ex.Message, "Tài khoản đã tồn tại");
            }
        }

        [TestMethod]
        public void AddNewStaff_ShouldThrowNewException_IfPasswordLessThan6Characters()
        {
            try
            {
                // arrange
                AccountViewModelIn loginViewModelIn = new AccountViewModelIn("admin", "123", "New", "staff");

                // Act
                var result = _authService.AddNewStaff(loginViewModelIn);
            }
            catch (Exception ex)
            {
                // assert
                Assert.AreEqual(ex.Message, "Mật khẩu bao gồm 6 ký tự trở lên");
            }
        }

        [TestMethod]
        public void AddNewStaff_ShouldThrowNewException_IfFirstNameIsEmpty()
        {
            try
            {
                // arrange
                AccountViewModelIn loginViewModelIn = new AccountViewModelIn("admin", "123456", "", "staff");

                // Act
                var result = _authService.AddNewStaff(loginViewModelIn);
            }
            catch (Exception ex)
            {
                // assert
                Assert.AreEqual(ex.Message, "Tên không được để trống");
            }
        }

        [TestMethod]
        public void AddNewStaff_ShouldThrowNewException_IfLastnameIsEmpty()
        {
            try
            {
                // arrange
                AccountViewModelIn loginViewModelIn = new AccountViewModelIn("admin", "123456", "New", "");

                // Act
                _authService.AddNewStaff(loginViewModelIn);
            }
            catch (Exception ex)
            {
                // assert
                Assert.AreEqual(ex.Message, "Họ không được để trống");
            }
        }

        [TestMethod]
        public void AdminResetPassword_ShouldReturnSuccessfullyCode_IfValidInfomation()
        {
            // arrange
            int accountId = 3;

            // Act 
            var result = _authService.AdminResetPassword(accountId);

            // Assert
            Assert.AreEqual(Const.REQUEST_CODE_SUCCESSFULLY, result.Code);
        }

        [TestMethod]
        public void AdminResetPassword_ShouldThrowNewException_IfAccountIdIsAdminCount()
        {
            AccountViewModelOut result;
            // arrange
            int accountId = 0;

            //Act
            result = _authService.AdminResetPassword(accountId);

            // Assert
            Assert.AreEqual(result.ErrorMessage, "Account id không hợp lệ");
        }

        [TestMethod]
        public void AdminResetPassword_ShouldThrowNewException_IfAccountIdIsNotExist()
        {
            AccountViewModelOut result;
            // arrange
            int accountId = 50;

            //Act
            result = _authService.AdminResetPassword(accountId);

            // Assert
            Assert.AreEqual(result.ErrorMessage, "Account không tồn tại");
        }

        // admin change pw
        [TestMethod]
        public void AdminChangePassword_ShouldReturnSuccessfullyCode_IfvalidInput()
        {

            //arrange

            AccountViewModelIn modelIn = new AccountViewModelIn("admin", "654321", "123456");

            // Act
            var result = _authService.AdminChangePassword(modelIn);

            //Assert 
            Assert.AreEqual(Const.REQUEST_CODE_SUCCESSFULLY, result.Code);
        }

        [TestMethod]
        public void AdminChangePassword_ShouldThrowNewException_IfUsernameDoesNotExsist()
        {

            //arrange

            AccountViewModelIn modelIn = new AccountViewModelIn("123", "654321", "123456");

            // Act
            var result = _authService.AdminChangePassword(modelIn);

            //Assert 
            Assert.AreEqual(Const.REQUEST_CODE_FAILED, result.Code);
            Assert.AreEqual("Account không tồn tại", result.ErrorMessage);
        }
        [TestMethod]
        public void AdminChangePassword_ShouldThrowNewException_IfPasswordDoesNotMatch()
        {

            //arrange

            AccountViewModelIn modelIn = new AccountViewModelIn("Admin", "asdqwe", "123456");

            // Act
            var result = _authService.AdminChangePassword(modelIn);

            //Assert 
            Assert.AreEqual(Const.REQUEST_CODE_FAILED, result.Code);
            Assert.AreEqual("Tên tài khoản hoặc mật khẩu không đúng", result.ErrorMessage);
        }

        // Admin change pw
        [TestMethod]
        public void AdminChangePassword_ShouldThrowNewException_IfPasswordIsLessThan6Characters()
        {

            //arrange
            AccountViewModelIn modelIn = new AccountViewModelIn("Admin", "123456", "123");

            // Act
            var result = _authService.AdminChangePassword(modelIn);

            //Assert 
            Assert.AreEqual(Const.REQUEST_CODE_FAILED, result.Code);
            Assert.AreEqual("Mật khẩu bao gồm 6 ký tự trở lên", result.ErrorMessage);
        }
    }
}
