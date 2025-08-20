Feature: Let's go to the cinema tests"
    Scenario: Buying one ticket
        Given user is on "/client/index.php" page
        When the user selects the day
        When the user select of the hall and session time
        When the user selects one place
        Then user sees title for one place "Вы выбрали билеты:"
    Scenario: Buying three tickets
        Given user is on "/client/index.php" page
        When the user selects the day
        When the user select of the hall and session time
        When the user selects three place
        Then user sees title for three place "Вы выбрали билеты:"
    Scenario: Sad Path: Buying an occupied sea
        Given user is on "/client/index.php" page
        When the user selects the day
        When the user select of the hall and session time
        When the user selects occupied seats
        Then the user clicks on the book button "Забронировать"