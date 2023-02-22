Feature: Browse ideas by domain by Domain, Topic, or Tech
  As a user, I want to be able to browse public ideas that are linked to a specific domain, so that I can find and learn about new and innovative ideas in my area of interest.

  Background:
    Given the id map is initialized
    And the database contains the following RegularUser accounts (Strategy1):
      | id | firstname | lastname | email                   | password     |
      | 1  | John      | Goblikon | john.goblikon@gmail.com | P@ssWord1234 |
    And the database contains the following domains (Strategy1):
      | id | name       |
      | 2  | Software   |
      | 3  | English    |
      | 4  | Electrical |
    And the database contains the following topics (Strategy1):
      | id | name              |
      | 5  | Web Dev           |
      | 6  | Game Dev          |
      | 7  | Embedded Software |
      | 8  | CLI Tool          |
      | 9  | Other             |
    And the database contains the following techs (Strategy1):
      | id | name       |
      | 10 | Rust       |
      | 11 | TypeScript |
      | 12 | Go         |
      | 13 | C++        |
      | 14 | Other      |
    And the database contains the following ideas (Strategy1):
      # Date in ms from the unix epoch (Other constructors are deprecated)
      | id | title             | domains | topics | techs    | date | description | iconUrl  | purpose    | author |
      | 15 | Website Idea      | 2       | 5      | 10,11,12 | 1500 | Cool idea   | test.com | Great idea | 1      |
      | 16 | Video Game        | 2       | 6      | 13       | 1400 | Cool idea   | test.com | Great idea | 1      |
      | 17 | Microcontroller   | 2,4     | 7      | 10,13    | 1300 | Cool idea   | test.com | Great idea | 1      |
      | 18 | Command-Line tool | 2       | 8      | 10       | 1200 | Cool idea   | test.com | Great idea | 1      |
      | 19 | Novel             | 3       | 9      | 14       | 1100 | Cool idea   | test.com | Great idea | 1      |
      | 20 | Circuit           | 4       | 9      | 14       | 1000 | Cool idea   | test.com | Great idea | 1      |
    And I am logged in as the user with email "john.goblikon@gmail.com" and password "P@ssWord1234"

  # Normal/alternate flows

  Scenario Outline: Successfully browse ideas by domain, topic, and tech
    When the user requests to browse ideas by domains "<domain_ids>", topics "<topic_ids>", and techs "<techs_ids>"
    Then the user shall have access to the ideas with ids "<idea_ids>"

    Examples:
      | domain_ids | topic_ids | techs_ids | idea_ids          |
      | null       | null      | null      | 15,16,17,18,19,20 |
      | 2          | null      | null      | 15,16,17,18       |
      | 3          | null      | null      | 19                |
      | 4          | null      | null      | 17,20             |
      | null       | 5         | null      | 15                |
      | null       | 6         | null      | 16                |
      | null       | 7         | null      | 17                |
      | null       | 8         | null      | 18                |
      | null       | 9         | null      | 19,20             |
      | null       | null      | 10        | 15,17,18          |
      | null       | null      | 11        | 15                |
      | null       | null      | 12        | 15                |
      | null       | null      | 13        | 16,17             |
      | null       | null      | 14        | 19,20             |
      | 2,3        | null      | null      | 15,16,17,18,19    |
      | 3,4        | null      | null      | 17,19,20          |
      | 2,4        | null      | null      | 15,16,17,18,20    |
      | 2,3,4      | null      | null      | 15,16,17,18,19,20 |
      | 2          | 5         | null      | 15                |
      | 4          | null      | 10        | 17                |

  # Error flow
  Scenario: No idea exists with the given filter
    When the user erroneously requests to browse ideas by domains with id "2", topic with id "6", and tech with id "10"
    Then the user shall receive the error message "No ideas match the given criteria. Please try again with different criteria." with status "404"