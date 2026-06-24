export const menus = [
  {
    label: "Home",
    to: "/",
  },
  {
    label: "Profile",
    to: "/profile",
    children: [
      {
        label: "Details",
        to: "details",
        children: [
          {
            label: "Location",
            to: "location",
            children: [
              {
                label: "City",
                to: "city",
                children: [
                  {
                    label: "Area",
                    to: "area",
                    children: [
                      {
                        label: "Street",
                        to: "street",
                        children: [
                          {
                            label: "Building",
                            to: "building",
                            children: [
                              {
                                label: "Floor",
                                to: "floor",
                                children: [
                                  {
                                    label: "Room",
                                    to: "room",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    label: "Settings",
    to: "/settings",
    children: [
      {
        label: "Account",
        to: "account",
        children: [
          {
            label: "Personal Info",
            to: "personal-info",
            children: [
              {
                label: "Documents",
                to: "documents",
                children: [
                  {
                    label: "Passport",
                    to: "passport",
                    children: [
                      {
                        label: "Verification",
                        to: "verification",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        label: "Security",
        to: "security",
        children: [
          {
            label: "Login",
            to: "login",
            children: [
              {
                label: "Two Factor Auth",
                to: "2fa",
                children: [
                  {
                    label: "Authenticator App",
                    to: "authenticator",
                    children: [
                      {
                        label: "Backup Codes",
                        to: "backup-codes",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            label: "Register",
            to: "register",
            children: [
              {
                label: "Random Data",
                to: "random-data",
                children: [
                  {
                    label: "Level 1",
                    to: "level-1",
                    children: [
                      {
                        label: "Level 2",
                        to: "level-2",
                        children: [
                          {
                            label: "Level 3",
                            to: "level-3",
                            children: [
                              {
                                label: "Level 4",
                                to: "level-4",
                                children: [
                                  {
                                    label: "Level 5",
                                    to: "level-5",
                                    children: [
                                      {
                                        label: "Level 6",
                                        to: "level-6",
                                      },
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    label: "Administration",
    to: "/admin",
    children: [
      {
        label: "Users",
        to: "users",
        children: [
          {
            label: "Departments",
            to: "departments",
            children: [
              {
                label: "Teams",
                to: "teams",
                children: [
                  {
                    label: "Projects",
                    to: "projects",
                    children: [
                      {
                        label: "Modules",
                        to: "modules",
                        children: [
                          {
                            label: "Components",
                            to: "components",
                            children: [
                              {
                                label: "Functions",
                                to: "functions",
                                children: [
                                  {
                                    label: "Tests",
                                    to: "tests",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

export default menus;
