import { FaBullseye } from "react-icons/fa";

export const employee = [
  {
    userId: 1,
    name: "Ali Bukhari",
    email: "e1@e.com",
    password: "123",
    role: "user",
  },
  {
    userId: 2,
    name: "Muhammad Umar",
    email: "e2@e.com",
    password: "123",
    role: "user",
  },
  {
    userId: 3,
    name: "Zara Awan",
    email: "e3@e.com",
    password: "123",
    role: "user",
  },
  {
    userId: 4,
    name: "Abdul Rehman",
    email: "e4@e.com",
    password: "123",
    role: "user",
  },
  {
    userId: 5,
    name: "Raza Salman",
    email: "e5@e.com",
    password: "123",
    role: "user",
  },
];
export const taskData = [
  {
    userId: 1,
    tasks: [
      {
        taskId: 1,
        taskTitle: "Update website",
        taskDescription:
          "Redesign the homepage layout, improving the overall user interface and ensuring the site is optimized for both desktop and mobile users. This includes updating visuals and content sections.",
        taskDate: "2024-10-12",
        category: "Design",
        active: false,
        newTask: true,
        completed: true,
        failed: false,
      },
      {
        taskId: 2,
        taskTitle: "Fix login bug",
        taskDescription:
          "Investigate and resolve the login functionality issues preventing some users from accessing their accounts. This requires debugging and potential backend changes to authentication.",
        taskDate: "2024-09-30",
        category: "Development",
        active: false,
        newTask: false,
        completed: true,
        failed: false,
      },
      {
        taskId: 3,
        taskTitle: "Optimize images",
        taskDescription:
          "Compress and optimize all website images to improve page load speed without sacrificing quality. This task involves using image optimization tools and formats such as WebP.",
        taskDate: "2024-10-10",
        category: "Performance",
        active: true,
        newTask: false,
        completed: false,
        failed: false,
      },
      {
        taskId: 4,
        taskTitle: "Backup database",
        taskDescription:
          "Implement regular automated backups for the company’s database to ensure data integrity and security. Test the backup system for reliability and ensure proper documentation is kept.",
        taskDate: "2024-10-15",
        category: "Database",
        active: true,
        newTask: true,
        completed: false,
        failed: false,
      },
      {
        taskId: 5,
        taskTitle: "Optimize server performance",
        taskDescription:
          "Improve server response time by fine-tuning configuration settings, monitoring resources, and applying any necessary updates to enhance overall server stability and performance.",
        taskDate: "2024-09-25",
        category: "Performance",
        active: false,
        newTask: false,
        completed: true,
        failed: false,
      },
    ],
  },
  {
    userId: 2,
    tasks: [
      {
        taskId: 6,
        taskTitle: "Set up email server",
        taskDescription:
          "Configure and deploy the company’s email server to manage internal and external communications. This includes ensuring secure protocols and integration with the corporate domain.",
        taskDate: "2024-10-01",
        category: "IT",
        active: true,
        newTask: true,
        completed: false,
        failed: false,
      },
      {
        taskId: 7,
        taskTitle: "Deploy application",
        taskDescription:
          "Deploy the latest version of the application to the production environment, ensuring that all features work as expected post-launch. Coordinate with team members to resolve any post-launch issues.",
        taskDate: "2024-10-08",
        category: "Development",
        active: true,
        newTask: false,
        completed: false,
        failed: false,
      },
      {
        taskId: 8,
        taskTitle: "Update software",
        taskDescription:
          "Install and apply the latest software patches and security updates across all systems to safeguard the company from vulnerabilities. Ensure all critical services remain operational during updates.",
        taskDate: "2024-10-10",
        category: "IT",
        active: true,
        newTask: true,
        completed: false,
        failed: false,
      },
      {
        taskId: 9,
        taskTitle: "Optimize security settings",
        taskDescription:
          "Review and update firewall rules, user access levels, and other security measures to prevent unauthorized access and ensure data protection in compliance with company policies.",
        taskDate: "2024-10-12",
        category: "Security",
        active: true,
        newTask: false,
        completed: false,
        failed: false,
      },
      {
        taskId: 10,
        taskTitle: "Test backup system",
        taskDescription:
          "Run comprehensive tests on the backup and recovery systems to ensure business continuity in the event of data loss or corruption. Document test results and implement improvements if needed.",
        taskDate: "2024-10-15",
        category: "IT",
        active: true,
        newTask: true,
        completed: false,
        failed: false,
      },
    ],
  },
  {
    userId: 3,
    tasks: [
      {
        taskId: 11,
        taskTitle: "Update CMS",
        taskDescription:
          "Update the company’s content management system to the latest version, ensuring compatibility with existing plugins and integrations. Test all functionalities post-update for potential issues.",
        taskDate: "2024-10-07",
        category: "Development",
        active: true,
        newTask: true,
        completed: false,
        failed: false,
      },
      {
        taskId: 12,
        taskTitle: "Fix bugs in checkout",
        taskDescription:
          "Resolve the bugs affecting the checkout process to ensure users can complete their purchases without issues. This involves testing all payment gateway integrations and fixing related errors.",
        taskDate: "2024-10-08",
        category: "Development",
        active: true,
        newTask: false,
        completed: false,
        failed: false,
      },
      {
        taskId: 13,
        taskTitle: "Improve site speed",
        taskDescription:
          "Implement performance optimizations such as lazy loading, code minification, and content delivery network (CDN) configurations to significantly improve the website's load times.",
        taskDate: "2024-10-10",
        category: "Performance",
        active: true,
        newTask: true,
        completed: false,
        failed: false,
      },
      {
        taskId: 14,
        taskTitle: "Enhance mobile responsiveness",
        taskDescription:
          "Ensure the website is fully responsive across all mobile devices and screen sizes, fixing any layout or UI issues that could negatively affect the user experience.",
        taskDate: "2024-10-12",
        category: "Design",
        active: true,
        newTask: false,
        completed: false,
        failed: false,
      },
      {
        taskId: 15,
        taskTitle: "Conduct UI testing",
        taskDescription:
          "Carry out comprehensive UI testing to verify smooth interactions and responsiveness across the application. Report and resolve any issues found during the testing phase.",
        taskDate: "2024-10-14",
        category: "Testing",
        active: true,
        newTask: true,
        completed: false,
        failed: false,
      },
    ],
  },
  {
    userId: 4,
    tasks: [
      {
        taskId: 16,
        taskTitle: "Optimize website",
        taskDescription:
          "Implement SEO best practices on the company website to enhance visibility on search engines. This includes updating meta tags, keywords, and ensuring overall content optimization.",
        taskDate: "2024-10-04",
        category: "SEO",
        active: true,
        newTask: true,
        completed: false,
        failed: false,
      },
      {
        taskId: 17,
        taskTitle: "Fix 404 errors",
        taskDescription:
          "Identify and resolve all 404 errors across the website, ensuring that users are properly redirected to working pages or error messages that guide them to the correct resources.",
        taskDate: "2024-10-06",
        category: "Development",
        active: true,
        newTask: false,
        completed: false,
        failed: false,
      },
      {
        taskId: 18,
        taskTitle: "Update sitemap",
        taskDescription:
          "Ensure that the sitemap is up-to-date and properly submitted to search engines for indexing. This task involves restructuring the sitemap if necessary to improve search visibility.",
        taskDate: "2024-10-08",
        category: "SEO",
        active: true,
        newTask: true,
        completed: false,
        failed: false,
      },
      {
        taskId: 19,
        taskTitle: "Improve mobile site",
        taskDescription:
          "Enhance the mobile version of the website by improving the loading speed, fixing navigation issues, and ensuring the design is optimized for small screens, improving overall user experience.",
        taskDate: "2024-10-10",
        category: "Design",
        active: true,
        newTask: false,
        completed: false,
        failed: false,
      },
      {
        taskId: 20,
        taskTitle: "Test speed optimizations",
        taskDescription:
          "Test the effects of recent optimizations on the website’s speed using various tools and metrics to measure improvement in load times. Document the results and suggest further improvements.",
        taskDate: "2024-10-12",
        category: "Testing",
        active: true,
        newTask: true,
        completed: false,
        failed: false,
      },
    ],
  },
  {
    userId: 5,
    tasks: [
      {
        taskId: 21,
        taskTitle: "Run performance tests",
        taskDescription:
          "Conduct thorough performance testing on the system to assess its response to increased loads and identify any potential bottlenecks or weaknesses in the current infrastructure.",
        taskDate: "2024-10-05",
        category: "Performance",
        active: true,
        newTask: true,
        completed: false,
        failed: false,
      },
      {
        taskId: 22,
        taskTitle: "Add analytics tracking",
        taskDescription:
          "Integrate Google Analytics tracking on key pages of the website to monitor traffic patterns and gain insights into user behavior for data-driven improvements.",
        taskDate: "2024-10-06",
        category: "Analytics",
        active: true,
        newTask: false,
        completed: false,
        failed: false,
      },
      {
        taskId: 23,
        taskTitle: "Improve UX on checkout",
        taskDescription:
          "Enhance the user experience on the checkout page, including simplifying the process, reducing friction points, and ensuring all fields are clearly labeled for ease of use.",
        taskDate: "2024-10-08",
        category: "UX",
        active: true,
        newTask: true,
        completed: false,
        failed: false,
      },
      {
        taskId: 24,
        taskTitle: "Conduct security audit",
        taskDescription:
          "Perform a comprehensive security audit to identify and mitigate potential vulnerabilities, ensuring the site adheres to best security practices and industry standards.",
        taskDate: "2024-10-10",
        category: "Security",
        active: true,
        newTask: false,
        completed: false,
        failed: false,
      },
      {
        taskId: 25,
        taskTitle: "Evaluate SEO keywords",
        taskDescription:
          "Analyze current SEO keyword performance and identify opportunities for improvement. Update content as necessary to target high-value keywords and enhance organic search visibility.",
        taskDate: "2024-10-12",
        category: "SEO",
        active: true,
        newTask: true,
        completed: false,
        failed: false,
      },
    ],
  },
];

export const admin = {
  name: "Admin",
  email: "admin@me.com",
  password: "123",
  role: "admin",
};
