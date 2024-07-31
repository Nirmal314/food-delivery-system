<p align="center">
  <img src="https://cdn-icons-png.flaticon.com/512/6295/6295417.png" width="100" />
</p>
<p align="center">
    <h1 align="center">FOOD-DELIVERY-SYSTEM</h1>
</p>
<p align="center">
    <em>HTTP error 401 for prompt `slogan`</em>
</p>
<p align="center">
	<img src="https://img.shields.io/github/license/Nirmal314/food-delivery-system?style=flat&color=0080ff" alt="license">
	<img src="https://img.shields.io/github/last-commit/Nirmal314/food-delivery-system?style=flat&logo=git&logoColor=white&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/Nirmal314/food-delivery-system?style=flat&color=0080ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/Nirmal314/food-delivery-system?style=flat&color=0080ff" alt="repo-language-count">
<p>
<p align="center">
		<em>Developed with the software and tools below.</em>
</p>
<p align="center">
	<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat&logo=JavaScript&logoColor=black" alt="JavaScript">
	<img src="https://img.shields.io/badge/PostCSS-DD3A0A.svg?style=flat&logo=PostCSS&logoColor=white" alt="PostCSS">
	<img src="https://img.shields.io/badge/Autoprefixer-DD3735.svg?style=flat&logo=Autoprefixer&logoColor=white" alt="Autoprefixer">
	<img src="https://img.shields.io/badge/YAML-CB171E.svg?style=flat&logo=YAML&logoColor=white" alt="YAML">
	<img src="https://img.shields.io/badge/React-61DAFB.svg?style=flat&logo=React&logoColor=black" alt="React">
	<br>
	<img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=flat&logo=TypeScript&logoColor=white" alt="TypeScript">
	<img src="https://img.shields.io/badge/Prisma-2D3748.svg?style=flat&logo=Prisma&logoColor=white" alt="Prisma">
	<img src="https://img.shields.io/badge/Razorpay-0C2451.svg?style=flat&logo=Razorpay&logoColor=white" alt="Razorpay">
	<img src="https://img.shields.io/badge/Socket.io-010101.svg?style=flat&logo=socketdotio&logoColor=white" alt="Socket.io">
	<img src="https://img.shields.io/badge/JSON-000000.svg?style=flat&logo=JSON&logoColor=white" alt="JSON">
</p>
<hr>

## 🔗 Quick Links

> - [📍 Overview](#-overview)
> - [📦 Features](#-features)
> - [📂 Repository Structure](#-repository-structure)
> - [🧩 Modules](#-modules)
> - [🚀 Getting Started](#-getting-started)
>   - [⚙️ Installation](#️-installation)
>   - [🤖 Running food-delivery-system](#-running-food-delivery-system)
>   - [🧪 Tests](#-tests)
> - [🛠 Project Roadmap](#-project-roadmap)
> - [🤝 Contributing](#-contributing)
> - [📄 License](#-license)
> - [👏 Acknowledgments](#-acknowledgments)

---

## 📍 Overview

HTTP error 401 for prompt `overview`

---

## 📦 Features

HTTP error 401 for prompt `features`

---

## 📂 Repository Structure

```sh
└── food-delivery-system/
    ├── README.md
    ├── actions
    │   ├── admin
    │   │   ├── menu-items
    │   │   │   ├── delete.ts
    │   │   │   ├── insert.ts
    │   │   │   └── update.ts
    │   │   └── orders
    │   │       ├── accpet.ts
    │   │       ├── cancel.ts
    │   │       └── markasdone.ts
    │   ├── auth
    │   │   ├── adminsignup.ts
    │   │   ├── googlelogin.ts
    │   │   ├── login.ts
    │   │   └── signup.ts
    │   ├── revalidatePathClient.ts
    │   └── user
    │       ├── cart
    │       │   ├── create
    │       │   │   └── create.ts
    │       │   ├── delete
    │       │   │   ├── delete-cart-by-userid.ts
    │       │   │   ├── delete-cart-item-by-id.ts
    │       │   │   └── delete-cart-items-by-cart-id.ts
    │       │   ├── insert
    │       │   │   └── insert.ts
    │       │   ├── select
    │       │   │   ├── get-cart-by-userid.ts
    │       │   │   └── get-cartitems-by-id.ts
    │       │   └── update
    │       │       └── update-cartitem-count.ts
    │       ├── menu-items
    │       │   ├── get-menuitem-by-id.ts
    │       │   ├── get-menuitems-by-cuisine.ts
    │       │   ├── get-menuitems-by-menuid.ts
    │       │   └── get-top3-menuitems.ts
    │       ├── order
    │       │   └── create.ts
    │       ├── payment
    │       │   └── verify.ts
    │       └── restaurants
    │           ├── get-restaurants.ts
    │           └── get-top3-restaurants.ts
    ├── app
    │   ├── (admin)
    │   │   ├── adminsignup
    │   │   │   └── page.tsx
    │   │   ├── dashboard
    │   │   │   ├── components
    │   │   │   │   ├── MarkAsCompleted.tsx
    │   │   │   │   └── ProcessingOrder.tsx
    │   │   │   └── page.tsx
    │   │   ├── menu
    │   │   │   ├── columns.tsx
    │   │   │   ├── components
    │   │   │   │   ├── Actions.tsx
    │   │   │   │   ├── AddMenuItem.tsx
    │   │   │   │   ├── Delete.tsx
    │   │   │   │   └── Edit.tsx
    │   │   │   ├── data-table.tsx
    │   │   │   └── page.tsx
    │   │   └── orders
    │   │       ├── columns.tsx
    │   │       ├── components
    │   │       │   ├── Items.tsx
    │   │       │   └── User.tsx
    │   │       ├── data-table.tsx
    │   │       └── page.tsx
    │   ├── (user)
    │   │   ├── cart
    │   │   │   ├── CartContext.tsx
    │   │   │   ├── components
    │   │   │   │   ├── CartItem.tsx
    │   │   │   │   ├── CheckOutBtn.tsx
    │   │   │   │   ├── InitContext.tsx
    │   │   │   │   ├── OptimisticFoodItemCounter.tsx
    │   │   │   │   └── TotalAmount.tsx
    │   │   │   ├── layout.tsx
    │   │   │   └── page.tsx
    │   │   ├── cuisine
    │   │   │   └── [type]
    │   │   │       └── page.tsx
    │   │   ├── restaurants
    │   │   │   ├── [rid]
    │   │   │   │   ├── FoodItemCard.tsx
    │   │   │   │   └── page.tsx
    │   │   │   └── page.tsx
    │   │   ├── signup
    │   │   │   └── page.tsx
    │   │   └── yourorders
    │   │       ├── [oid]
    │   │       │   ├── columns.tsx
    │   │       │   ├── data-table.tsx
    │   │       │   └── page.tsx
    │   │       ├── columns.tsx
    │   │       ├── data-table.tsx
    │   │       └── page.tsx
    │   ├── api
    │   │   ├── auth
    │   │   │   └── [...nextauth]
    │   │   │       └── route.ts
    │   │   └── deletecloudinary
    │   │       └── route.ts
    │   ├── favicon.ico
    │   ├── globals.css
    │   ├── layout.tsx
    │   ├── login
    │   │   ├── complete-google-login
    │   │   │   └── page.tsx
    │   │   └── page.tsx
    │   ├── not-found.tsx
    │   ├── page.tsx
    │   ├── socket.js
    │   └── template.tsx
    ├── auth.config.ts
    ├── auth.ts
    ├── components
    │   ├── FormInput.tsx
    │   ├── Header
    │   │   ├── Header.tsx
    │   │   └── HeaderComponents
    │   │       ├── HeaderAdmin.tsx
    │   │       ├── HeaderNotLoggedIn.tsx
    │   │       ├── HeaderUser.tsx
    │   │       ├── Notifications.tsx
    │   │       └── OrderToast
    │   │           ├── NotificationToaster.tsx
    │   │           ├── Notifications.tsx
    │   │           └── Toast.tsx
    │   ├── HomeAccordion.tsx
    │   ├── LoadingSkeletons
    │   │   ├── CardLoading.tsx
    │   │   ├── CartRowLoading.tsx
    │   │   ├── CartTotalLoading.tsx
    │   │   ├── EditMenuItemLoading.tsx
    │   │   ├── ImageLoading.tsx
    │   │   ├── MenuItemLoading.tsx
    │   │   └── RestaurantLoading.tsx
    │   ├── LogoutButton.tsx
    │   ├── OptimisticTotalPrice.tsx
    │   ├── PageNavigation.tsx
    │   ├── RestaurantItemCard.tsx
    │   └── ui
    │       ├── accordion.tsx
    │       ├── alert-dialog.tsx
    │       ├── avatar.tsx
    │       ├── badge.tsx
    │       ├── button.tsx
    │       ├── card.tsx
    │       ├── checkbox.tsx
    │       ├── drawer.tsx
    │       ├── dropdown-menu.tsx
    │       ├── form.tsx
    │       ├── hover-card.tsx
    │       ├── input.tsx
    │       ├── label.tsx
    │       ├── popover.tsx
    │       ├── select.tsx
    │       ├── separator.tsx
    │       ├── sheet.tsx
    │       ├── sonner.tsx
    │       ├── table.tsx
    │       ├── textarea.tsx
    │       ├── toast.tsx
    │       ├── toaster.tsx
    │       └── use-toast.ts
    ├── components.json
    ├── data
    │   ├── admin.ts
    │   └── user.ts
    ├── lib
    │   ├── cloudinary.ts
    │   ├── db.ts
    │   ├── knock.ts
    │   ├── razorpay.ts
    │   └── utils.ts
    ├── middleware.ts
    ├── next-auth.d.ts
    ├── next.config.mjs
    ├── package.json
    ├── pnpm-lock.yaml
    ├── postcss.config.js
    ├── prisma
    │   ├── DFD.puml
    │   ├── ERD.puml
    │   ├── STD.puml
    │   ├── migrations
    │   │   ├── 20240312113256_init
    │   │   │   └── migration.sql
    │   │   ├── 20240312130216_restaurant_auth
    │   │   │   └── migration.sql
    │   │   ├── 20240312184930_contact
    │   │   │   └── migration.sql
    │   │   ├── 20240313042150_contact_nullable
    │   │   │   └── migration.sql
    │   │   ├── 20240316102435_menu
    │   │   │   └── migration.sql
    │   │   ├── 20240319061545_menuitem_image
    │   │   │   └── migration.sql
    │   │   ├── 20240325121432_cart
    │   │   │   └── migration.sql
    │   │   ├── 20240325151042_cart_with_rid
    │   │   │   └── migration.sql
    │   │   ├── 20240327073149_order_and_customer_address
    │   │   │   └── migration.sql
    │   │   ├── 20240327074057_added_indices
    │   │   │   └── migration.sql
    │   │   ├── 20240327084126_restaurant_cart_bug_fixed
    │   │   │   └── migration.sql
    │   │   ├── 20240404082527_payments_reviews
    │   │   │   └── migration.sql
    │   │   ├── 20240408085431_removed_payment_method
    │   │   │   └── migration.sql
    │   │   ├── 20240408103651_active_field_in_cart_one_to_one_between_order_and_cart
    │   │   │   └── migration.sql
    │   │   └── migration_lock.toml
    │   ├── prisma-erd.svg
    │   └── schema.prisma
    ├── public
    │   ├── ...
    │   ├── food-images
    │   │   ├── ...
    ├── razorpay.d.ts
    ├── routes.ts
    ├── schemas
    │   └── index.ts
    ├── server.js
    ├── tailwind.config.ts
    ├── tsconfig.json
    └── typings.ts
```

---

## 🚀 Getting Started

**_Requirements_**

Ensure you have the following dependencies installed on your system:

- **TypeScript**: `version 5.0.0`

### ⚙️ Installation

1. Clone the food-delivery-system repository:

```sh
git clone https://github.com/Nirmal314/food-delivery-system
```

2. Change to the project directory:

```sh
cd food-delivery-system
```

3. Install the dependencies:

```sh
npm install
or
pnpm install
or
yarn install
```

### 🤖 Running food-delivery-system

Use the following command to run food-delivery-system:

```sh
npm run dev
or
pnpm run dev
or
yarn run dev
```

---

## 🤝 Contributing

Contributions are welcome! Here are several ways you can contribute:

- **Submit Pull Requests**: Review open PRs, and submit your own PRs.
- **[Join the Discussions](https://github.com/Nirmal314/food-delivery-system/discussions)**: Share your insights, provide feedback, or ask questions.
- **[Report Issues](https://github.com/Nirmal314/food-delivery-system/issues)**: Submit bugs found or log feature requests for Food-delivery-system.

<details closed>
    <summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your GitHub account.
2. **Clone Locally**: Clone the forked repository to your local machine using a Git client.
   ```sh
   git clone https://github.com/Nirmal314/food-delivery-system
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to GitHub**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.

Once your PR is reviewed and approved, it will be merged into the main branch.

</details>
