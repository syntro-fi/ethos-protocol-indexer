# Ethos Protocol Indexer

This repository contains the indexer for the Ethos Protocol. It indexes events from the Ethos Protocol smart contracts and maintains a queryable database of protocol state.

Related repositories:

- Frontend: <https://github.com/syntro-fi/ethos-protocol-frontend>
- Contracts: <https://github.com/syntro-fi/ethos-protocol>

## Prerequisites

- Node.js (v16+)
- bun
- Local Ethereum node (e.g., Anvil) running on port 8545

## Setup

1. Install dependencies:

```bash
bun install
```

2. Generate contract types and indexer code:

```bash
# Generate Wagmi contract types
bun generate

# Generate Envio indexer code
bun codegen
```

## Development

1. Start your local Ethereum node (Anvil) on port 8545

2. Run the indexer in development mode:

```bash
bun dev
```

3. For testing:

```bash
bun test
```

## Available Scripts

- `bun clean` - Clean TypeScript build
- `bun build` - Build the project
- `bun watch` - Watch for changes and rebuild
- `bun test` - Run tests
- `bun codegen` - Generate indexer code
- `bun dev` - Run indexer in development mode
- `bun start` - Start the indexer
- `bun generate` - Generate contract types

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

