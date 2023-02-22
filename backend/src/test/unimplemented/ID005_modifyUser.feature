Feature: Modify Moderator
  As a user, I want to modify the details of my account so that they contain my updated information

  Background:
    Given the database contains the following accounts:
      | firstName | lastName       | email                    | password              | authority |
      | Enzo      | Benoit-Jeannin | enzo.benoit@gmail.com    | EnzoIsAwesome01       | User      |
      | Wassim    | Jabbour        | wassim.jabbour@gmail.com | WassimIsAwesome01     | User      |
      | Owner     | Steve          | owner.steve@gmail.com    | OwnerIsAwesome01      | Owner     |
      | Moderator | Bob            | moderator.bob@gmail.com  | ModeratorIsAwesome01  | Moderator |

  # Normal Flow

  Scenario Outline: Successfully update a user account (own account)
    Given that the user is logged as user with email "enzo.benoit@gmail.com" and password "EnzoIsAwesome01"
    When the user requests to modify the account with email "enzo.benoit@gmail.com" with "<new_lastname>" as the new lastname and "<new_firstname>" as the new first name
    Then account with email "enzo.benoit@gmail.com" have "<new_lastname>" as lastname and "<new_firstname>" as firstname
    Then the number of moderator accounts in the database shall be "2"

    Examples:
      | new_lastname   | new_firstname |
      | Benoit-Jeannin | Enzo          |
      | Benoit         | Enzo-Jeannin  |

  Scenario Outline: Successfully update a user account (from owner account)
    Given that the user is logged as owner with email "owner.steve@gmail.com" and password "OwnerIsAwesome01"
    When the user requests to modify the account with email "enzo.benoit@gmail.com" with "<new_lastname>" as the new lastname and "<new_firstname>" as the new first name
    Then account with email "enzo.benoit@gmail.com" have "<new_lastname>" as lastname and "<new_firstname>" as firstname
    Then the number of moderator accounts in the database shall be "2"

    Examples:
      | new_lastname   | new_firstname |
      | Benoit-Jeannin | Enzo          |
      | Benoit         | Enzo-Jeannin  |

  Scenario Outline: Successfully update a user account (from moderator account)
    Given that the user is logged as moderator with email "moderator.bob@gmail.com" and password "ModeratorIsAwesome01"
    When the user requests to modify the account with email "enzo.benoit@gmail.com" with "<new_lastname>" as the new lastname and "<new_firstname>" as the new first name
    Then account with email "enzo.benoit@gmail.com" have "<new_lastname>" as lastname and "<new_firstname>" as firstname
    Then the number of moderator accounts in the database shall be "2"

    Examples:
      | new_lastname   | new_firstname |
      | Benoit-Jeannin | Enzo          |
      | Benoit          | Enzo-Jeannin  |

  # Error Flows
  Scenario Outline: Unsuccessfully update a user account because you are not logged in
    Given I am not logged in
    When the user requests to modify the account with email <email> with <new_lastname> as the new lastname and <new_firstname> as the new first name
    Then the user should be denied permission to the requested resource with an HTTP status code of "<httpstatus>"

    Examples:
      | email                    | new_lastname   | new_firstname | httpstatus |
      | enzo.benoit@gmail.com    | Benoit         | NewEnzo       | 403        |

  Scenario: Unsuccessfully update a user account because you are not logged in with the correct account
    Given that the user is logged as user with the email "wassim.jabbour@gmail.com" and the password "WassimIsAwesome01"
    When the user requests to update their account information with the following details:
      | email                 | firstName | lastName | oldPassword     | newPassword        |
      | enzo.benoit@gmail.com | NewEnzo   | Benoit   | EnzoIsAwesome01 | NewEnzoIsAwesome01 |
    Then the user should be denied permission to the requested resource with an HTTP status code of "403"

  Scenario Outline: Unsuccessfully update a user account because of wrong password
    Given that the user is logged with the email "enzo.benoit@gmail.com" and the password "EnzoIsAwesome01"
    When the user request to update their account using the old password <oldPassword> with new password <newPassword>
    Then the following error <error> should be raised
    Then the number of moderator accounts in the database is still "2"

    Examples:
      | oldPassword     | newPassword    | error                                                                                                                                                            |
      | EnzoIsAwesome0  | enzo           | The password you entered is incorrect                                                                                                                            |
      | EnzoIsAwesome01 | enzo           | Please enter a valid password. Passwords must be at least 8 characters long and contain at least one number, one lowercase character and one uppercase character |
      | EnzoIsAwesome01 | Enzo1          | Please enter a valid password. Passwords must be at least 8 characters long and contain at least one number, one lowercase character and one uppercase character |
      | EnzoIsAwesome01 | thisisenzo     | Please enter a valid password. Passwords must be at least 8 characters long and contain at least one number, one lowercase character and one uppercase character |
      | EnzoIsAwesome01 | 111111111      | Please enter a valid password. Passwords must be at least 8 characters long and contain at least one number, one lowercase character and one uppercase character |
      | EnzoIsAwesome01 | thispassword1  | Please enter a valid password. Passwords must be at least 8 characters long and contain at least one number, one lowercase character and one uppercase character |
      | EnzoIsAwesome01 | FFFFFFFFFFFFF8 | Please enter a valid password. Passwords must be at least 8 characters long and contain at least one number, one lowercase character and one uppercase character |
      | EnzoIsAwesome01 |                | Please enter a valid password. Passwords cannot be left empty                                                                                                    |