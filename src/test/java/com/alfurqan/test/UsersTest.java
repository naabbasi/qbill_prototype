package com.alfurqan.test;

import com.qterminals.qbill.entities.Users;
import com.qterminals.qbill.entities.constant.UserStatus;
import com.qterminals.qbill.service.UserService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

class UsersTest extends GenericTest {

	@Autowired
	private UserService userService;

	private static Users user;

	@Order(1)
	@Test
	void save() {
		var user = new Users("test_user_1", "x", "y");
		user.setFirstName("Test Firstname");
		user.setLastName("Test Lastname");
		UsersTest.user = user;

		var user1 = new Users("test_user_2", "x", "y");
		user1.setFirstName("Test Firstname");
		user1.setLastName("Test Lastname");
		UsersTest.user = this.userService.saveOrUpdate(user);
		this.userService.saveOrUpdate(user1);
	}

	@Order(2)
	@Test
	void update() {
		var getUser = this.userService.get(UsersTest.user.getUserId());
		Assertions.assertTrue(getUser.isPresent());
		var user = getUser.get();
		user.setUserStatus("y");
		this.userService.saveOrUpdate(user);
	}

	@Order(3)
	@Test
	void findById() {
		var byUserId = this.userService.get(UsersTest.user.getUserId());
		Assertions.assertTrue(byUserId.isPresent());
		var user = byUserId.get();
		Assertions.assertEquals("test_user_1", user.getUsername());
		Assertions.assertEquals(UserStatus.IN_ACTIVE, user.getUserStatus());
	}

	@Order(4)
	@Test
	void login() {
		var user = this.userService.login("test_user_2", "x", UserStatus.ACTIVE);
		Assertions.assertNotNull(user);
		Assertions.assertEquals("test_user_2", user.getUsername());
		Assertions.assertEquals("x", user.getPassword());
		Assertions.assertEquals(UserStatus.ACTIVE, user.getUserStatus());
	}

	@Order(5)
	@Test
	void deleteAll() {
		this.userService.list().forEach(user -> {
			this.userService.delete(user.getUserId());
		});
	}

	@Order(6)
	@Test
	void listAll() {
		Assertions.assertEquals(0, this.userService.count());
	}
}
