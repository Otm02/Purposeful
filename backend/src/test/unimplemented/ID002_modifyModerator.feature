Feature: Modify Moderator
  As a moderator, I want to be able to modify the details of my account so that they contain my updated information

  Background:
    Given the database contains the following moderator accounts:
      | firstName | lastName | email                   | password             |
      | Owner     | Steve    | owner.steve@gmail.com   | OwnerIsAwesome01     |
      | Moderator | Bob      | moderator.bob@gmail.com | ModeratorIsAwesome01 |

  # Normal Flow

  Scenario: Successfully update an moderator account
    Given that the user is logged with the email "owner.steve@gmail.com" and the password "OwnerIsAwesome01"
    When the user requests to update their account information with the following details:
      | firstName | lastName | oldPassword      | newPassword         |
      | NewOwner  | Steve2   | OwnerIsAwesome01 | NewOwnerIsAwesome01 |
    Then account with email "owner.steve@gmail.com" should be updated with the following details:
      | firstName | lastName | password            |
      | NewOwner  | Steve2   | NewOwnerIsAwesome01 |
    Then the number of moderator accounts in the datavase shall be "2"

  # Error Flows

  Scenario: Unsuccessfully update an moderator account because you are not logged in
    When the user requests to update their account information with the following details:
      | email                 | firstName | lastName | oldPassword      | newPassword         |
      | owner.steve@gmail.com | NewOwner  | Steve2   | OwnerIsAwesome01 | NewOwnerIsAwesome01 |
    Then the user should be denied permission to the requested resource with an HTTP status code of "401"

  Scenario: Unsuccessfully update an moderator account because you are not logged in with the correct account
    Given that the user is logged with the email "moderator.bob@gmail.com" and the password "ModeratorIsAwesome01"
    When the user requests to update their account information with the following details:
      | email                 | firstName | lastName | oldPassword      | newPassword         |
      | owner.steve@gmail.com | NewOwner  | Steve2   | OwnerIsAwesome01 | NewOwnerIsAwesome01 |
    Then the user should be denied permission to the requested resource with an HTTP status code of "403"

  Scenario Outline: Unsuccessfully update an moderator account
    Given that the user is logged with the email "owner.steve@gmail.com" and the password "OwnerIsAwesome01"
    When the user request to update their account using the old password "<oldPassword>" with new password "<newPassword>"
    Then the following error "<error>" should be raised
    Then the number of moderator accounts in the database is still "2"

    Examples:
      | oldPassword      | newPassword    | error                                                                                                                                                            | httpstatus |
      | OwnerIsAwesome0  | owner          | The password you entered is incorrect                                                                                                                            | 400        |
      | OwnerIsAwesome01 | owner          | Please enter a valid password. Passwords must be at least 8 characters long and contain at least one number, one lowercase character and one uppercase character | 400        |
      | OwnerIsAwesome01 | Own1           | Please enter a valid password. Passwords must be at least 8 characters long and contain at least one number, one lowercase character and one uppercase character | 400        |
      | OwnerIsAwesome01 | thisistheowner | Please enter a valid password. Passwords must be at least 8 characters long and contain at least one number, one lowercase character and one uppercase character | 400        |
      | OwnerIsAwesome01 | 111111111      | Please enter a valid password. Passwords must be at least 8 characters long and contain at least one number, one lowercase character and one uppercase character | 400        |
      | OwnerIsAwesome01 | thispassword1  | Please enter a valid password. Passwords must be at least 8 characters long and contain at least one number, one lowercase character and one uppercase character | 400        |
      | OwnerIsAwesome01 | FFFFFFFFFFFFF8 | Please enter a valid password. Passwords must be at least 8 characters long and contain at least one number, one lowercase character and one uppercase character | 400        |
      | OwnerIsAwesome01 |                | Please enter a valid password. Passwords cannot be left empty                                                                                                    | 400        |
