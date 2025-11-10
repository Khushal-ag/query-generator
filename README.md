# Query Generator

A powerful React-based Query Builder UI component that allows users to construct complex queries with multiple conditions using AND/OR logic. Build dynamic queries with nested groups, field selectors, operators, and value selectors.

## Features

- **Single & Multiple Conditions**: Add and remove conditions dynamically
- **AND/OR Logic**: Support for AND/OR operators at root and group levels
- **Nested Groups**: Create nested condition groups with unlimited depth
- **Dynamic Dropdowns**: Field, operator, and value selectors with context-aware options
- **JSON Output**: Generate clean, structured JSON output of constructed queries
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS
- **Type-Safe**: Full TypeScript support for type safety

## Tech Stack

- ⚛️ **React 19** - UI library
- 📘 **TypeScript** - Type safety
- ⚡ **Vite** - Build tool
- 🎨 **Tailwind CSS** - Styling
- 🧩 **shadcn/ui** - UI components
- 🚀 **Bun** - Package manager and runtime

## Quick Start

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+

### Installation

```bash
bun install
```

### Development

```bash
bun dev
```

Open [http://localhost:5173](http://localhost:5173) to view the application.

### Build

```bash
bun run build
```

### Preview Production Build

```bash
bun run preview
```

## Available Scripts

| Script       | Description                                   |
| ------------ | --------------------------------------------- |
| `dev`        | Runs the app in development mode              |
| `build`      | Builds the app for production                 |
| `serve`      | Serves the production build                   |
| `preview`    | Builds and serves the production build        |
| `type-check` | Runs TypeScript type-checking                 |
| `lint`       | Runs ESLint to check for code quality issues  |
| `fmt`        | Formats the code with Prettier                |
| `fmt:check`  | Checks if the code is formatted with Prettier |
| `clean`      | Removes `dist` and `node_modules` directories |
| `cleani`     | Cleans and reinstalls dependencies            |
| `ui`         | Opens shadcn/ui CLI for adding components     |

## Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── ConditionRow.tsx # Individual condition row component
│   ├── QueryBuilder.tsx # Main query builder component
│   ├── QueryGroup.tsx   # Nested group component
│   └── QueryOutput.tsx  # JSON output display component
├── config/
│   └── fields.ts        # Field and value configurations
├── types/
│   └── query.ts         # TypeScript type definitions
├── utils/
│   └── id.ts            # ID generation utility
├── App.tsx              # Main application component
└── main.tsx             # Application entry point
```

## Usage

### Basic Query Building

1. Select a field (Status, Priority, Assigned To, Category)
2. Choose an operator (equals, not equals, contains, does not contain)
3. Select a value based on the chosen field
4. Add more conditions or groups as needed
5. Set AND/OR logic for conditions and groups
6. Click "Generate Query" to see the JSON output

### Nested Groups

Create nested condition groups by clicking "Add Group" within an existing group. This allows for complex query structures with multiple levels of nesting.

## Query Structure

The generated query follows this structure:

```json
{
  "logic": "AND",
  "conditions": [
    {
      "field": "Status",
      "operator": "equals",
      "value": "Open"
    }
  ],
  "groups": [
    {
      "logic": "OR",
      "conditions": [...],
      "groups": [...]
    }
  ]
}
```

## Configuration

Field options and values can be configured in `src/config/fields.ts`:

- **Fields**: Status, Priority, Assigned To, Category
- **Operators**: equals, not equals, contains, does not contain
- **Values**: Field-specific values (e.g., Status: Open, In Progress, Closed)

## Documentation

See [DOCUMENTATION.md](./DOCUMENTATION.md) for detailed implementation logic and architecture.

## License

MIT

