// Assuming input data structure of session for every user
interface UserSession {
  logged_in: Date;
  logged_out: Date;
  lastSeenAt: Date;
}

interface User {
  sessions: UserSession[];
}

// Function to calculate monthly logged in and active users
function calculateMonthlyActiveUsers(users: User[], currentDate: Date): Map<string, { loggedIn: number, active: number }> {
  const monthlyActiveUsers: Map<string, { loggedIn: number, active: number }> = new Map();

  users.forEach(user => {
      user.sessions.forEach(session => {
          const loggedInMonthKey = `${session.logged_in.getFullYear()}-${session.logged_in.getMonth()}`;
          const currentMonthKey = `${currentDate.getFullYear()}-${currentDate.getMonth()}`;

          if (!monthlyActiveUsers.has(loggedInMonthKey)) {
              monthlyActiveUsers.set(loggedInMonthKey, { loggedIn: 0, active: 0 });
          }

          if (loggedInMonthKey === currentMonthKey) {
              monthlyActiveUsers.get(loggedInMonthKey)!.loggedIn++;

              if (session.lastSeenAt.getFullYear() === currentDate.getFullYear() &&
                  session.lastSeenAt.getMonth() === currentDate.getMonth()) {
                  monthlyActiveUsers.get(loggedInMonthKey)!.active++;
              }
          }
      });
  });

  return monthlyActiveUsers;
}

// Example usage
const users: User[] = [
  {
      sessions: [
          { logged_in: new Date('2024-03-15'), logged_out: new Date('2024-03-16'), lastSeenAt: new Date('2024-03-16') },
          { logged_in: new Date('2024-03-20'), logged_out: new Date('2024-03-21'), lastSeenAt: new Date('2024-03-20') }
      ]
  },
  // Add more users here
];

const currentDate = new Date('2024-03-26');
const monthlyActiveUsers = calculateMonthlyActiveUsers(users, currentDate);
console.log(monthlyActiveUsers);
