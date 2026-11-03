import type { PublishedProjectRecord } from "../types/project";
import { image, showcase, video } from "./media";

export const archerDuel: PublishedProjectRecord = {
  slug: "archer-duel",
  title: "Archer Duel",
  subtitle: "Two players, one local server.",
  summary: "A two-player Unity duel connected through a dedicated local TCP server.",
  tracks: ["programming"],
  tier: "supporting",
  rank: 7,
  publication: "published",
  projectType: "Practice project",
  roles: ["Network programmer"],
  tools: ["Unity", "C#", "TCP"],
  facts: [
    { label: "Engine", value: "Unity" },
    { label: "Focus", value: "Local server & multiplayer" },
  ],
  scope: "I set up the local server and implemented the multiplayer connection and synchronization. The game uses third-party art and animation resources.",
  version: "A local Windows test with two Unity clients on one computer. Both players are driven by a simple scripted AI through loopback proxies; the server resolves the match. The recording is silent, with a camera crop that follows the players.",
  cover: image("archer-duel", "duel-cover", "Two archers in a low-poly arena", "A local two-player archery duel."),
  showcase: {
    ...showcase(
      "archer-duel",
      "Archer Duel gameplay",
      "One full round between two AI-driven players. Silent, with a follow crop.",
      "Two archers circle, aim and exchange charged shots. Health drops on both sides until Player 1 wins the round.",
      "duel-highlights",
    ),
    width: 1280,
    height: 720,
    poster: image("archer-duel", "duel-cover", "Two archers in the arena", "").src,
    posterSrcSet: image("archer-duel", "duel-cover", "Two archers in the arena", "").srcSet,
  },
  context: "Archer Duel is a two-player arena game. A separate local server receives player input and sends the resulting game state to both clients.",
  contributions: [
    "Set up a dedicated local TCP server and client connection flow.",
    "Implemented player input, server-authoritative state and snapshots.",
    "Connected movement, projectiles and round state across clients.",
  ],
  breakdown: [
    {
      id: "server-setup",
      layout: "wide",
      title: "Start the server, connect two players",
      paragraphs: ["The Windows build starts the server in batch mode. The local test log records the listener and both player connections."],
      media: image("archer-duel", "server-test", "Server startup command and local test log excerpt", "Illustrated from the local server's startup and connection log."),
    },
    {
      id: "client-sync",
      layout: "wide",
      title: "One match, two clients",
      paragraphs: ["The same moment is recorded from both clients during the local match."],
      media: {
        ...video(
          "archer-duel",
          "Synchronized client views",
          "Both clients show the same local match side by side. AI-driven input; no audio.",
          "Two client views side by side show the same archers, shots and health at the same moment.",
          "client-sync",
        ),
        width: 1280,
        height: 720,
        poster: image("archer-duel", "duel-cover", "Two archers in the arena", "").src,
        posterSrcSet: image("archer-duel", "duel-cover", "Two archers in the arena", "").srcSet,
      },
    },
  ],
  flow: [
    { label: "Start", detail: "Launch the dedicated TCP server." },
    { label: "Connect", detail: "Two clients join the local server." },
    { label: "Play", detail: "Clients send input; the server simulates the round." },
    { label: "Sync", detail: "Snapshots update both client views." },
  ],
  result: ["The local match shows both clients receiving server-driven movement, shots and health changes."],
  credits: [
    { name: "Third-party resources", detail: "The project includes Kevin Iglesias Human Animations and EasyAssets Hit Effect Pack resources." },
  ],
  links: [],
};
