import React, { useEffect, useMemo, useRef, useState } from "react";
import mermaid from "mermaid";
import AccountTreeRounded from "@mui/icons-material/AccountTreeRounded";
import AddCircleOutlineRounded from "@mui/icons-material/AddCircleOutlineRounded";
import AssignmentTurnedInRounded from "@mui/icons-material/AssignmentTurnedInRounded";
import CloseRounded from "@mui/icons-material/CloseRounded";
import DataObjectRounded from "@mui/icons-material/DataObjectRounded";
import DeleteOutlineRounded from "@mui/icons-material/DeleteOutlineRounded";
import EditRounded from "@mui/icons-material/EditRounded";
import GroupsRounded from "@mui/icons-material/GroupsRounded";
import HubRounded from "@mui/icons-material/HubRounded";
import InsightsRounded from "@mui/icons-material/InsightsRounded";
import RestartAltRounded from "@mui/icons-material/RestartAltRounded";
import RuleRounded from "@mui/icons-material/RuleRounded";
import SaveRounded from "@mui/icons-material/SaveRounded";
import SchemaRounded from "@mui/icons-material/SchemaRounded";

const globalCss = `
  * {
    box-sizing: border-box;
  }

  html,
  body,
  #root {
    width: 100%;
    min-height: 100%;
    margin: 0;
  }

  body {
    overflow-x: hidden;
    background: #050711;
  }

  body,
  input,
  button {
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }

  button,
  input {
    -webkit-tap-highlight-color: transparent;
  }

  ::selection {
    background: rgba(45, 212, 191, 0.32);
    color: #f8fafc;
  }

  .ambient-field {
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    background:
      linear-gradient(125deg, rgba(20, 184, 166, 0.14), transparent 28%),
      linear-gradient(235deg, rgba(244, 114, 182, 0.12), transparent 34%),
      linear-gradient(180deg, #060812 0%, #0c1020 46%, #050711 100%);
    animation: ambientShift 18s ease-in-out infinite alternate;
  }

  .ambient-field::before {
    content: "";
    position: absolute;
    inset: 0;
    opacity: 0.22;
    background-image:
      linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px);
    background-size: 42px 42px;
    mask-image: linear-gradient(180deg, rgba(0,0,0,0.9), rgba(0,0,0,0.18));
  }

  .ambient-field::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.055) 48%, transparent 72%);
    transform: translateX(-70%);
    animation: sheenSweep 9s ease-in-out infinite;
  }

  .app-content {
    position: relative;
    z-index: 1;
    animation: pageIn 420ms ease both;
  }

  .glass-button,
  .node-card,
  .toggle-button,
  .search-input {
    transition:
      transform 180ms ease,
      border-color 180ms ease,
      background 180ms ease,
      box-shadow 180ms ease,
      color 180ms ease;
  }

  .glass-button:hover,
  .toggle-button:hover {
    transform: translateY(-1px);
    border-color: rgba(45, 212, 191, 0.62) !important;
    background: rgba(15, 23, 42, 0.84) !important;
    box-shadow: 0 14px 30px rgba(0, 0, 0, 0.28), 0 0 0 1px rgba(45, 212, 191, 0.12);
  }

  .glass-button:active,
  .toggle-button:active,
  .node-card:active {
    transform: translateY(0) scale(0.99);
  }

  .glass-button:focus-visible,
  .toggle-button:focus-visible,
  .node-card:focus-visible,
  .search-input:focus-visible {
    outline: 2px solid rgba(45, 212, 191, 0.85);
    outline-offset: 3px;
  }

  .search-input:focus {
    border-color: rgba(45, 212, 191, 0.72) !important;
    box-shadow: 0 0 0 4px rgba(45, 212, 191, 0.11);
  }

  .node-card:hover {
    transform: translateY(-2px);
    border-color: rgba(125, 211, 252, 0.5) !important;
    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.34), 0 0 0 1px rgba(125, 211, 252, 0.08) !important;
  }

  .tree-node {
    animation: nodeIn 240ms ease both;
  }

  .children-wrap {
    animation: branchIn 240ms ease both;
  }

  .panel-float {
    animation: softFloat 7s ease-in-out infinite alternate;
  }

  .diagram-grid {
    display: grid;
    grid-template-columns: minmax(230px, 0.32fr) minmax(0, 1fr);
    gap: 16px;
  }

  .mermaid-render svg {
    display: block;
    width: 100%;
    max-width: 100%;
    height: auto;
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 1ms !important;
      animation-iteration-count: 1 !important;
      scroll-behavior: auto !important;
      transition-duration: 1ms !important;
    }
  }

  @media (max-width: 980px) {
    .responsive-layout {
      grid-template-columns: 1fr !important;
    }

    .overview-strip {
      grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    }

    .sticky-panel {
      position: static !important;
    }

    .diagram-grid {
      grid-template-columns: 1fr !important;
    }
  }

  @media (max-width: 680px) {
    .app-content {
      padding: 14px !important;
    }

    .toolbar-actions {
      width: 100%;
    }

    .toolbar-actions > * {
      flex: 1 1 auto;
    }

    .overview-strip {
      grid-template-columns: 1fr !important;
    }
  }

  @keyframes ambientShift {
    from {
      filter: saturate(1) hue-rotate(0deg);
      transform: scale(1);
    }
    to {
      filter: saturate(1.15) hue-rotate(8deg);
      transform: scale(1.02);
    }
  }

  @keyframes sheenSweep {
    0%,
    45% {
      transform: translateX(-75%);
      opacity: 0;
    }
    62% {
      opacity: 1;
    }
    100% {
      transform: translateX(75%);
      opacity: 0;
    }
  }

  @keyframes pageIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes nodeIn {
    from {
      opacity: 0;
      transform: translateY(7px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes branchIn {
    from {
      opacity: 0;
      transform: translateX(-8px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes softFloat {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(4px);
    }
  }
`;

/*
  Dekonstrukt NotebookLM-style Mind Map
  - Click node to show explanation
  - Expand/collapse branches
  - Search nodes
  - Expand all / collapse all
  - Auto-expands matching branches
*/

const mindMapData = {
  id: "root",
  title: "Dekonstrukt",
  description:
    "A unified electronic music platform combining artist tools, events, streaming, discovery, monetization, analytics, and AI stem separation.",
  type: "platform",
  children: [
    {
      id: "artist-platform",
      title: "Artist Platform",
      description:
        "Central hub for artists to upload tracks, schedule releases, manage profiles, and collaborate with others.",
      type: "core-feature",
      children: [
        {
          id: "artist-overview",
          title: "Overview",
          description:
            "A central place for artists to manage artist content, schedule releases, and manage detailed profiles with bios and social links.",
          type: "detail",
          children: [],
        },
        {
          id: "music-upload-release-scheduling",
          title: "Music Upload & Release Scheduling",
          description:
            "Authorized roles can upload tracks and plan release timing in advance for organized publishing.",
          type: "capability",
          children: [],
        },
        {
          id: "artist-profiles",
          title: "Artist Profiles",
          description:
            "Profiles include bios, media, and external links to represent the artist professionally.",
          type: "capability",
          children: [],
        },
        {
          id: "collaboration-tools",
          title: "Collaboration Tools",
          description:
            "Supports collaboration workflows, including revenue splitting between contributors.",
          type: "capability",
          children: [],
        },
        {
          id: "artist-value",
          title: "Value",
          description:
            "Integrates directly with events, analytics, and monetization for streamlined artist management.",
          type: "value",
          children: [],
        },
      ],
    },
    {
      id: "event-management",
      title: "Event Management",
      description:
        "System for creating, promoting, and managing electronic music events connected to artists and platform activity.",
      type: "core-feature",
      children: [
        {
          id: "events-overview",
          title: "Overview",
          description:
            "A straightforward system for creating and managing events on the platform.",
          type: "detail",
          children: [],
        },
        {
          id: "event-creation",
          title: "Event Creation",
          description:
            "Organizers can create events with images, venues, dates, and lineup information.",
          type: "capability",
          children: [],
        },
        {
          id: "ticket-tiers",
          title: "Ticket Tiers",
          description:
            "Supports pricing models such as Early Bird, VIP, and other event access categories.",
          type: "capability",
          children: [],
        },
        {
          id: "qr-promo-support",
          title: "QR Codes & Promo Codes",
          description:
            "Enables access validation, campaign promotion, and discount-driven event marketing.",
          type: "capability",
          children: [],
        },
        {
          id: "lineup-management",
          title: "Lineup Management",
          description:
            "Allows event organizers to control featured artists and performance sequencing.",
          type: "capability",
          children: [],
        },
        {
          id: "events-value",
          title: "Value",
          description:
            "Direct integration with artist profiles reduces complexity and can offer lower fees than traditional event platforms.",
          type: "value",
          children: [],
        },
      ],
    },
    {
      id: "streaming-audio",
      title: "Streaming & Audio Experience",
      description:
        "High-quality listening experience built for electronic music with waveform playback, playlists, and premium access control.",
      type: "core-feature",
      children: [
        {
          id: "streaming-overview",
          title: "Overview",
          description:
            "A streaming experience built for electronic music listeners, focused on quality and usability.",
          type: "detail",
          children: [],
        },
        {
          id: "waveform-player",
          title: "Waveform-based Music Player",
          description:
            "Provides a waveform-style player for more interactive listening and track navigation.",
          type: "capability",
          children: [],
        },
        {
          id: "adaptive-audio-quality",
          title: "Adaptive Audio Quality",
          description:
            "Adjusts playback quality based on network and device conditions for seamless listening.",
          type: "capability",
          children: [],
        },
        {
          id: "playlists-dj-sets",
          title: "Playlist Creation & DJ Sets",
          description:
            "Users can organize music into playlists and engage with DJ-set-oriented listening flows.",
          type: "capability",
          children: [],
        },
        {
          id: "free-vs-premium",
          title: "Free vs Premium Access",
          description:
            "Differentiates user experience and feature access between free and premium tiers.",
          type: "capability",
          children: [],
        },
        {
          id: "streaming-value",
          title: "Value",
          description:
            "Delivers a high-quality and genre-tailored listening experience for electronic music audiences.",
          type: "value",
          children: [],
        },
      ],
    },
    {
      id: "stem-separation",
      title: "Stem Separation",
      description:
        "AI-powered audio tool that separates tracks into stems and gives users interactive control for learning, remixing, and analysis.",
      type: "core-feature",
      children: [
        {
          id: "stem-overview",
          title: "Overview",
          description:
            "An AI-powered system that splits tracks into multiple stems for interactive music exploration.",
          type: "detail",
          children: [],
        },
        {
          id: "stem-drums-bass-vocals",
          title: "Separate Into Stems",
          description:
            "Can split audio into drums, bass, vocals, and other musical components.",
          type: "capability",
          children: [],
        },
        {
          id: "stem-realtime-control",
          title: "Real-time Control",
          description:
            "Users can solo, mute, and adjust individual stems live during playback.",
          type: "capability",
          children: [],
        },
        {
          id: "stem-export-download",
          title: "Export / Download",
          description:
            "Premium users can export or download stem outputs for deeper music interaction.",
          type: "capability",
          children: [],
        },
        {
          id: "stem-looping-analysis",
          title: "Looping & Analysis Tools",
          description:
            "Provides looping and analytical interaction to support study, remixing, and experimentation.",
          type: "capability",
          children: [],
        },
        {
          id: "stem-value",
          title: "Value",
          description:
            "Enables learning, remixing, and deeper interaction with music beyond normal streaming.",
          type: "value",
          children: [],
        },
        {
          id: "stem-use-cases",
          title: "Use Cases",
          description:
            "Different user groups benefit from stem access in different ways.",
          type: "group",
          children: [
            {
              id: "use-case-producers",
              title: "Producers",
              description:
                "Can study production techniques by isolating track components.",
              type: "use-case",
              children: [],
            },
            {
              id: "use-case-djs",
              title: "DJs",
              description:
                "Can create edits, remixes, and performance-ready variations.",
              type: "use-case",
              children: [],
            },
            {
              id: "use-case-fans",
              title: "Fans",
              description:
                "Can explore music interactively and understand songs more deeply.",
              type: "use-case",
              children: [],
            },
          ],
        },
      ],
    },
    {
      id: "discovery-engine",
      title: "Discovery Engine",
      description:
        "Personalized recommendation system for helping users discover music, artists, and events more effectively.",
      type: "core-feature",
      children: [
        {
          id: "discovery-overview",
          title: "Overview",
          description:
            "A personalized system for discovering music and events on the platform.",
          type: "detail",
          children: [],
        },
        {
          id: "personalized-feed",
          title: "Personalized Feed",
          description:
            "Surfaces content recommendations based on user behavior and preferences.",
          type: "capability",
          children: [],
        },
        {
          id: "genre-browsing-charts",
          title: "Genre Browsing & Charts",
          description:
            "Lets users browse by genre and explore trending or relevant chart-based content.",
          type: "capability",
          children: [],
        },
        {
          id: "weekly-playlists",
          title: "Weekly Playlists",
          description:
            "Provides regularly refreshed playlist recommendations to keep discovery active.",
          type: "capability",
          children: [],
        },
        {
          id: "discovery-value",
          title: "Value",
          description:
            "Continuously improves discovery as the platform learns from user behavior.",
          type: "value",
          children: [],
        },
      ],
    },
    {
      id: "community-social",
      title: "Community & Social",
      description:
        "Social layer that lets users connect, react, follow updates, and interact with artists and other listeners.",
      type: "core-feature",
      children: [
        {
          id: "community-overview",
          title: "Overview",
          description:
            "Designed to build real interaction and engagement across the platform.",
          type: "detail",
          children: [],
        },
        {
          id: "follow-artists-users",
          title: "Follow Artists & Users",
          description:
            "Users can follow creators and other users to stay connected to their activity.",
          type: "capability",
          children: [],
        },
        {
          id: "likes-comments-shares",
          title: "Likes, Comments & Shares",
          description:
            "Supports direct social engagement around content and activity.",
          type: "capability",
          children: [],
        },
        {
          id: "notifications",
          title: "Notifications",
          description:
            "Keeps users informed about releases, updates, interactions, and platform activity.",
          type: "capability",
          children: [],
        },
        {
          id: "community-value",
          title: "Value",
          description:
            "Strengthens artist-fan relationships and increases overall engagement.",
          type: "value",
          children: [],
        },
      ],
    },
    {
      id: "monetization",
      title: "Monetization System",
      description:
        "Revenue model for both platform and artists, including event revenue, subscriptions, tips, and premium content.",
      type: "core-feature",
      children: [
        {
          id: "monetization-overview",
          title: "Overview",
          description:
            "Supports multiple revenue streams for both the platform and the artists using it.",
          type: "detail",
          children: [],
        },
        {
          id: "revenue-sources",
          title: "Revenue Sources",
          description:
            "Core revenue mechanisms built into the platform.",
          type: "group",
          children: [
            {
              id: "ticket-sales",
              title: "Ticket Sales",
              description:
                "Generates revenue through event access purchases.",
              type: "revenue",
              children: [],
            },
            {
              id: "premium-subscriptions",
              title: "Premium Subscriptions",
              description:
                "Creates recurring revenue through paid feature and content access.",
              type: "revenue",
              children: [],
            },
            {
              id: "tips",
              title: "Tips",
              description:
                "Allows fans to directly support artists financially.",
              type: "revenue",
              children: [],
            },
            {
              id: "paid-stem-downloads",
              title: "Paid Stem Downloads",
              description:
                "Lets premium users pay for advanced downloadable stem content.",
              type: "revenue",
              children: [],
            },
          ],
        },
        {
          id: "discord-membership-tiers",
          title: "Discord Membership Tiers",
          description:
            "Community-access layers that attach benefits to paid membership levels.",
          type: "group",
          children: [
            {
              id: "gold-tier",
              title: "Gold Tier",
              description:
                "Provides private Discord channel access, early release access, and basic community perks.",
              type: "membership",
              children: [],
            },
            {
              id: "platinum-tier",
              title: "Platinum Tier",
              description:
                "Includes all Gold benefits plus exclusive content.",
              type: "membership",
              children: [],
            },
            {
              id: "diamond-tier",
              title: "Diamond Tier",
              description:
                "Includes all Platinum benefits plus exclusive stem packs, premium content, and VIP event perks.",
              type: "membership",
              children: [],
            },
          ],
        },
        {
          id: "monetization-value",
          title: "Value",
          description:
            "Adds a strong community monetization layer and gives artists recurring income beyond streaming.",
          type: "value",
          children: [],
        },
      ],
    },
    {
      id: "analytics-dashboard",
      title: "Analytics Dashboard",
      description:
        "Insight layer for measuring growth, audience behavior, platform engagement, and event performance.",
      type: "core-feature",
      children: [
        {
          id: "analytics-overview",
          title: "Overview",
          description:
            "Provides clear performance insights to support decisions with data.",
          type: "detail",
          children: [],
        },
        {
          id: "plays-follower-growth",
          title: "Plays & Follower Growth",
          description:
            "Tracks listening activity and how artist audiences grow over time.",
          type: "metric",
          children: [],
        },
        {
          id: "audience-data",
          title: "Audience Data",
          description:
            "Gives insight into user behavior and listener characteristics.",
          type: "metric",
          children: [],
        },
        {
          id: "event-performance",
          title: "Event Performance",
          description:
            "Measures event outcomes such as traction, engagement, and effectiveness.",
          type: "metric",
          children: [],
        },
        {
          id: "analytics-value",
          title: "Value",
          description:
            "Enables better decision-making through platform and performance data.",
          type: "value",
          children: [],
        },
      ],
    },
    {
      id: "admin-moderation",
      title: "Admin & Moderation",
      description:
        "Operational control layer for maintaining safety, trust, reliability, and platform quality.",
      type: "core-feature",
      children: [
        {
          id: "admin-overview",
          title: "Overview",
          description:
            "Ensures platform safety, trust, stability, and operational reliability.",
          type: "detail",
          children: [],
        },
        {
          id: "user-content-management",
          title: "User & Content Management",
          description:
            "Gives admins control over users and published platform content.",
          type: "capability",
          children: [],
        },
        {
          id: "reporting-moderation",
          title: "Reporting & Moderation",
          description:
            "Supports issue reporting, review processes, and moderation workflows.",
          type: "capability",
          children: [],
        },
        {
          id: "system-monitoring",
          title: "System Monitoring",
          description:
            "Tracks platform health and operational conditions to maintain reliability.",
          type: "capability",
          children: [],
        },
        {
          id: "admin-value",
          title: "Value",
          description:
            "Maintains trust, stability, and quality across the platform.",
          type: "value",
          children: [],
        },
      ],
    },
    {
      id: "why-it-stands-out",
      title: "Why Dekonstrukt Stands Out",
      description:
        "Dekonstrukt combines streaming, live events, and AI-powered tools in one platform built specifically for electronic music.",
      type: "positioning",
      children: [
        {
          id: "differentiator-stem-separation",
          title: "Stem Separation Differentiator",
          description:
            "The AI stem separation feature enables interaction with music in ways unavailable on typical platforms.",
          type: "detail",
          children: [],
        },
      ],
    },
    {
      id: "implementation-roadmap",
      title: "Implementation Roadmap",
      description:
        "A phased rollout plan for building the platform from core features to advanced intelligence and community expansion.",
      type: "roadmap",
      children: [
        {
          id: "phase-1",
          title: "Phase 1",
          description:
            "Launches the artist platform, streaming features, and event management system.",
          type: "phase",
          children: [],
        },
        {
          id: "phase-2",
          title: "Phase 2",
          description:
            "Introduces stem separation, analytics, and monetization systems.",
          type: "phase",
          children: [],
        },
        {
          id: "phase-3",
          title: "Phase 3",
          description:
            "Adds advanced discovery and expanded community features.",
          type: "phase",
          children: [],
        },
      ],
    },
    {
      id: "final-word",
      title: "Final Word",
      description:
        "Dekonstrukt creates a complete ecosystem where artists manage music, fans discover and interact, events drive engagement, and monetization supports growth.",
      type: "summary",
      children: [
        {
          id: "ecosystem-artists",
          title: "Artists Upload & Manage Music",
          description:
            "Artists use the platform as a central place for publishing and control.",
          type: "summary-point",
          children: [],
        },
        {
          id: "ecosystem-fans",
          title: "Fans Discover & Interact",
          description:
            "Fans explore music and engage directly through discovery and social features.",
          type: "summary-point",
          children: [],
        },
        {
          id: "ecosystem-events",
          title: "Events Drive Engagement",
          description:
            "Live events connect artists and fans while extending platform activity.",
          type: "summary-point",
          children: [],
        },
        {
          id: "ecosystem-monetization",
          title: "Monetization Supports Growth",
          description:
            "Revenue systems create sustainability for both platform and artists.",
          type: "summary-point",
          children: [],
        },
      ],
    },
  ],
};

const extensionNodes = [
  {
    id: "plugin-marketplace",
    title: "Plugin Marketplace",
    description:
      "A digital producer-tools storefront for plugins, plugin sets, sample packs, presets, bundles, reviews, and downloadable assets.",
    type: "extension-feature",
    children: [
      {
        id: "marketplace-storefront",
        title: "Marketplace Storefront",
        description:
          "Users browse featured products, categories, best sellers, ratings, and compatibility details before purchase.",
        type: "capability",
        children: [],
      },
      {
        id: "marketplace-product-publishing",
        title: "Product Publishing",
        description:
          "Admins or authorized artists create listings with files, cover media, preview audio, version metadata, price, and release status.",
        type: "capability",
        children: [],
      },
      {
        id: "marketplace-analytics",
        title: "Marketplace Analytics",
        description:
          "Tracks product sales, downloads, conversion rates, refunds, top-rated products, and review trends.",
        type: "metric",
        children: [],
      },
    ],
  },
  {
    id: "download-entitlements",
    title: "Download Entitlements",
    description:
      "Access-control layer that grants secure downloads only after a valid marketplace purchase or premium entitlement.",
    type: "entitlement",
    children: [
      {
        id: "secure-download-links",
        title: "Secure Download Links",
        description:
          "The system verifies ownership, issues a secure link, and records each download event.",
        type: "capability",
        children: [],
      },
      {
        id: "entitlement-revocation",
        title: "Refunds & Revocation",
        description:
          "Refunded, cancelled, or manually revoked purchases remove future download access.",
        type: "rule",
        children: [],
      },
    ],
  },
  {
    id: "product-reviews",
    title: "Product Reviews & Moderation",
    description:
      "Purchase-verified ratings and review moderation for marketplace products, sample packs, presets, and bundles.",
    type: "governance",
    children: [
      {
        id: "verified-product-reviews",
        title: "Verified Product Reviews",
        description:
          "Only users with a valid entitlement can submit ratings and written reviews.",
        type: "capability",
        children: [],
      },
      {
        id: "review-moderation-queue",
        title: "Review Moderation Queue",
        description:
          "Moderators inspect flagged reviews and dismiss, hide, remove, or escalate them.",
        type: "capability",
        children: [],
      },
    ],
  },
  {
    id: "discord-automation",
    title: "Discord Subscription Automation",
    description:
      "Discord OAuth and bot-based role synchronization for Gold, Platinum, and Diamond subscription access.",
    type: "integration",
    children: [
      {
        id: "discord-account-linking",
        title: "Discord Account Linking",
        description:
          "Users connect a verified Discord identity from their Dekonstrukt profile before role sync.",
        type: "capability",
        children: [],
      },
      {
        id: "discord-role-sync",
        title: "Role Sync & Hierarchy",
        description:
          "The bot assigns or removes Gold, Platinum, and Diamond roles according to active subscription state.",
        type: "capability",
        children: [],
      },
      {
        id: "discord-sync-recovery",
        title: "Sync Logs & Recovery",
        description:
          "Sync jobs and logs support retries, troubleshooting, and admin-led recovery.",
        type: "rule",
        children: [],
      },
    ],
  },
  {
    id: "monthly-reporting",
    title: "Monthly Consolidated Reporting",
    description:
      "Moderator and admin reporting that combines revenue, moderation, content, growth, marketplace, Discord, and operational metrics.",
    type: "reporting",
    children: [
      {
        id: "monthly-revenue-summary",
        title: "Revenue Summary",
        description:
          "Reports gross, net, gateway fees, failed payments, refunds, provider totals, product sales, and subscriptions.",
        type: "metric",
        children: [],
      },
      {
        id: "monthly-governance-summary",
        title: "Governance & Growth Summary",
        description:
          "Combines moderation outcomes, content additions, user growth, artist growth, downloads, and sync failures.",
        type: "metric",
        children: [],
      },
      {
        id: "monthly-export-archive",
        title: "Export & Archive",
        description:
          "Generates an on-screen report, PDF or CSV export, and archived monthly report record.",
        type: "capability",
        children: [],
      },
    ],
  },
];

const nodeSpecOverrides = {
  root: {
    title: "Dekonstrukt",
    category: "core",
    priority: "Platform brief",
    sectionRef: "Sections 1-14 plus feature extension",
    summary:
      "A unified electronic music label ecosystem for streaming, artist management, discovery, community, monetization, moderation, analytics, AI stem separation, marketplace commerce, Discord access automation, and consolidated reporting.",
    actors: ["User", "Artist", "Moderator", "Admin", "System", "Stripe", "PayHere", "Discord"],
    features: [
      "Stream and discover music with playlists, DJ sets, recommendations, and social engagement.",
      "Let artists manage profiles, tracks, release schedules, collaborations, analytics, and premium content.",
      "Centralize payments, subscriptions, marketplace sales, revenue tracking, moderation, and admin oversight.",
      "Extend the platform with plugin marketplace commerce, Discord role automation, reviews, entitlements, and monthly reports.",
    ],
    useCases: [
      "Register and log in",
      "Manage profile and artist profile",
      "Upload and stream tracks",
      "Process stem separation",
      "Purchase subscriptions or marketplace products",
      "Moderate reports and reviews",
      "Generate monthly platform report",
    ],
    entities: [
      "User",
      "Artist",
      "Track",
      "Playlist",
      "Subscription",
      "PaymentTransaction",
      "MarketplaceProduct",
      "DownloadEntitlement",
      "DiscordSyncJob",
      "MonthlyPlatformReport",
    ],
    integrations: ["Stripe", "PayHere", "Discord OAuth", "Discord Bot", "AI stem processor"],
    businessRules: [
      "All role-specific dashboards and actions must enforce role-based access.",
      "Stripe and PayHere transactions should normalize into one internal revenue model.",
      "Premium tools, downloads, and Discord roles require active entitlement checks.",
      "Moderation and admin actions should be logged for governance.",
    ],
    diagramIds: [
      "overall-use-case",
      "registration-flow",
      "artist-upload-flow",
      "payment-revenue-flow",
      "stem-separation-flow",
      "moderation-flow",
      "marketplace-purchase-flow",
      "review-moderation-flow",
      "discord-role-sync-flow",
      "discord-revoke-flow",
      "monthly-report-flow",
      "payment-sequence",
      "discord-sync-sequence",
      "core-class-model",
      "marketplace-discord-class-model",
      "system-subsystems",
    ],
  },
  "artist-platform": {
    category: "core",
    priority: "High",
    sectionRef: "4.3 Artist Content Management Module",
    actors: ["Artist", "Admin","Moderator", "System"],
    features: [
      "Authorized roles can upload tracks WAV, MP3, or FLAC tracks with title, genre, tags, cover art, and descriptions.",
      "Artists can maintain artist profiles with bios, links, media, branding, and verification state.",
      "Admins can create artist profiles with bios, links, media, branding, and verification state.",
      "Moderators can schedule releases, publish exclusive content, manage DJ sets, and assign collaborator revenue shares.",
      "Expose performance analytics so artists can understand audience and content traction.",
    ],
    useCases: ["Upload track", "Edit track metadata", "Schedule release", "Add collaborators", "Assign revenue share", "Manage artist profile", "View content analytics"],
    entities: ["Artist", "Track", "RevenueSplit", "AnalyticsRecord", "Playlist"],
    integrations: ["File storage", "Revenue dashboard"],
    businessRules: [
      "Admins can create artist profiles; artists can manage permitted profile and content fields.",
      "Uploaded content must pass file format, metadata, release status, and permission checks.",
    ],
    diagramIds: ["artist-upload-flow", "core-class-model", "system-subsystems"],
  },
  "event-management": {
    category: "support",
    priority: "Medium",
    sectionRef: "Derived from platform scope and earlier sitemap",
    actors: ["Admin", "Artist", "User", "System"],
    features: [
      "Create events with venue, date, images, lineup, QR access, and promo support.",
      "Connect event visibility and performance back to artist profiles and analytics.",
    ],
    useCases: ["Create event", "Manage lineup", "Validate access", "Track event performance"],
    entities: ["Event", "Artist", "AnalyticsRecord", "PaymentTransaction"],
    integrations: ["QR access validation", "Payment provider"],
    businessRules: ["Ticket access and promo codes must be validated before admission or fulfillment."],
    diagramIds: ["payment-revenue-flow", "system-subsystems"],
  },
  "streaming-audio": {
    category: "core",
    priority: "High",
    sectionRef: "4.4 Streaming and Audio Experience Module",
    actors: ["User", "Artist", "Admin", "System"],
    features: [
      "Provide waveform playback, play/pause/seek/skip controls, queues, playlists, DJ sets, and listening history.",
      "Support audio quality selection and free versus premium restrictions.",
    ],
    useCases: ["Stream music", "Change audio quality", "Create playlist", "Listen to DJ set", "Continue recent listening"],
    entities: ["Track", "Playlist", "User", "AnalyticsRecord"],
    integrations: ["Audio streaming service", "Analytics pipeline"],
    businessRules: ["Premium-only tracks and audio quality options must check the user's subscription state."],
    diagramIds: ["overall-use-case", "core-class-model", "system-subsystems"],
  },
  "stem-separation": {
    category: "core",
    priority: "High",
    sectionRef: "4.5 Stem Separation Module",
    actors: ["User", "Artist", "Admin", "System"],
    features: [
      "Upload or select a track and process it into drums, bass, vocals, synths, or other stems.",
      "Allow solo, mute, loop, preview, export, or download interactions based on access level.",
    ],
    useCases: ["Upload/select track for stem separation", "Preview stems", "Download premium stem outputs"],
    entities: ["StemJob", "Track", "User", "PaymentTransaction"],
    integrations: ["AI stem processor", "File storage"],
    businessRules: [
      "Downloads and advanced controls are premium features.",
      "Stem jobs need visible status, failure handling, and output-file tracking.",
    ],
    diagramIds: ["stem-separation-flow", "core-class-model", "system-subsystems"],
  },
  "discovery-engine": {
    category: "core",
    priority: "Medium",
    sectionRef: "4.6 Discovery Engine Module",
    actors: ["User", "System", "Admin"],
    features: [
      "Surface personalized feeds, recommendations, genre browsing, charts, and weekly playlists.",
      "Feed user interactions back into future recommendation quality.",
    ],
    useCases: ["Browse recommendations", "Browse by genre", "View charts", "Submit recommendation feedback"],
    entities: ["Track", "Playlist", "AnalyticsRecord", "Follow"],
    integrations: ["Recommendation engine", "Analytics pipeline"],
    businessRules: ["Recommendation rules should be configurable by admin and improved by feedback loops."],
    diagramIds: ["overall-use-case", "system-subsystems"],
  },
  "community-social": {
    category: "core",
    priority: "High",
    sectionRef: "4.7 Community and Social Module",
    actors: ["User", "Artist", "Moderator", "Admin", "System"],
    features: [
      "Support follows, likes, comments, shares, notifications, and reporting abusive content or users.",
      "Connect community interactions to moderation queues and artist-fan engagement.",
    ],
    useCases: ["Like/comment/share", "Follow profile", "Report abusive content", "Receive notifications"],
    entities: ["Comment", "Like", "Follow", "Report", "Notification"],
    integrations: ["Notification service", "Moderation dashboard"],
    businessRules: ["Reported content and abusive interactions must be reviewable by moderators or admins."],
    diagramIds: ["moderation-flow", "review-moderation-flow", "core-class-model"],
  },
  monetization: {
    category: "core",
    priority: "High",
    sectionRef: "4.8 Monetization Module and 4.9 Payments",
    actors: ["User", "Artist", "Admin", "System", "Stripe", "PayHere"],
    features: [
      "Support subscriptions, tips, premium content, paid stem downloads, event revenue, and marketplace revenue.",
      "Normalize Stripe and PayHere provider events into centralized revenue and transaction records.",
    ],
    useCases: ["Purchase premium plan", "Process payment", "View centralized revenue", "Manage subscriptions"],
    entities: ["Subscription","SubscriptionPlan","PaymentTransaction","RevenueSplit","Order","OrderItem","RefundRecord"],
    integrations: ["Stripe", "PayHere", "Webhook/callback validation"],
    businessRules: [
      "Every payment callback/webhook must be validated before processing",
      "Duplicate callbacks must not create duplicate transactions",
      "Signature/checksum validation must succeed before granting access",
      "All transactions must be stored in a normalized internal format",
      "Refunds must revoke entitlements",
      "Original and normalized currency values must be stored"
    ],
    diagramIds: ["payment-revenue-flow", "payment-sequence", "marketplace-purchase-flow", "core-class-model"],
  },
  "analytics-dashboard": {
    category: "analysis",
    priority: "High",
    sectionRef: "4.10 Analytics Dashboard Module and 2.3 extension",
    actors: ["Artist", "Moderator", "Admin", "System"],
    features: [
      "Show play counts, follower growth, audience insights, top tracks, revenue, moderation, and system indicators.",
      "Extend analytics into monthly consolidated reporting for financial, content, growth, marketplace, and Discord sync data.",
    ],
    useCases: ["View artist analytics", "View platform KPIs", "Generate monthly platform report"],
    entities: ["AnalyticsRecord", "MonthlyPlatformReport", "ReportMetric", "ReportSection"],
    integrations: ["Analytics pipeline", "Export service"],
    businessRules: ["Moderators see limited analytics; admins receive full platform and revenue visibility."],
    diagramIds: ["monthly-report-flow", "core-class-model", "system-subsystems"],
  },
  "admin-moderation": {
    category: "governance",
    priority: "High",
    sectionRef: "4.11 Admin and Moderation Module",
    actors: ["Moderator", "Admin", "System"],
    features: [
      "Review reports, remove inappropriate content, warn or restrict accounts, escalate severe cases, and monitor suspicious activity.",
      "Admins manage roles, permissions, artist profiles, content categories, system operations, and final enforcement actions.",
    ],
    useCases: ["Review report", "Moderate content", "Suspend account", "Monitor system performance", "Escalate case"],
    entities: ["Report", "ReviewReport", "User", "Artist", "AnalyticsRecord"],
    integrations: ["Moderation dashboard", "Audit log", "System monitoring"],
    businessRules: [
      "Severe cases should be escalated from moderator to admin.",
      "Moderation decisions and admin actions should be auditable.",
    ],
    diagramIds: ["moderation-flow", "review-moderation-flow", "core-class-model", "system-subsystems"],
  },
  "plugin-marketplace": {
    category: "extension",
    priority: "High",
    sectionRef: "Feature extension 2.1 and UC-23 to UC-29",
    actors: ["User", "Artist", "Admin", "Moderator", "System", "Stripe", "PayHere"],
    features: [
      "Browse plugins, plugin sets, sample packs, presets, bundles, and downloadable digital assets.",
      "Show product details with included files, demo audio, screenshots, compatibility notes, price, ratings, and reviews.",
      "Support cart checkout through Stripe or PayHere and create orders, payment transactions, entitlements, and download access.",
      "Allow artists or admins to publish and manage marketplace listings.",
    ],
    useCases: [
      "UC-23 Browse Plugin Marketplace",
      "UC-24 View Plugin Product Details",
      "UC-25 Purchase Plugin Product or Sample Pack",
      "UC-29 Publish Marketplace Product",
    ],
    entities: [
      "MarketplaceProduct",
      "PluginSet",
      "SamplePack",
      "ProductAsset",
      "ProductCategory",
      "Order",
      "OrderItem",
      "PaymentTransaction",
    ],
    integrations: ["Stripe", "PayHere", "File storage", "Preview media"],
    businessRules: [
      "Product price and availability must be revalidated at checkout.",
      "Successful payment creates order items, revenue records, and download entitlement.",
      "Digital product lifecycle must support draft, scheduled, published, and unpublished states.",
    ],
    diagramIds: ["marketplace-purchase-flow", "payment-sequence", "marketplace-discord-class-model", "system-subsystems"],
  },
  "download-entitlements": {
    category: "extension",
    priority: "High",
    sectionRef: "Feature extension UC-25 and UC-26",
    actors: ["User", "Admin", "System", "Stripe", "PayHere"],
    features: [
      "Create entitlement records after a valid purchase, subscription, or admin grant.",
      "Validate entitlement state before issuing secure downloads.",
      "Record download counts and revoke access after refund, cancellation, expiry, or manual action.",
    ],
    useCases: ["UC-25 Purchase Plugin Product or Sample Pack", "UC-26 Download Purchased Product"],
    entities: ["DownloadEntitlement", "Order", "OrderItem", "MarketplaceProduct", "ProductAsset", "PaymentTransaction"],
    integrations: ["Secure download service", "Payment provider callbacks"],
    businessRules: [
      "No download link should be issued without active entitlement.",
      "Refunds and revoked purchases must disable future downloads.",
    ],
    diagramIds: ["marketplace-purchase-flow", "marketplace-discord-class-model"],
  },
  "product-reviews": {
    category: "governance",
    priority: "Medium",
    sectionRef: "Feature extension UC-27 and UC-28",
    actors: ["User", "Moderator", "Admin", "System"],
    features: [
      "Allow purchase-verified ratings and written reviews on owned products.",
      "Route abusive, misleading, spam, or irrelevant reviews to moderation.",
      "Recalculate rating summaries after reviews are submitted, edited, hidden, or removed.",
    ],
    useCases: ["UC-27 Rate and Review Product", "UC-28 Moderate Product Review"],
    entities: ["ProductReview", "ReviewReport", "MarketplaceProduct", "DownloadEntitlement", "Report"],
    integrations: ["Moderation queue", "Audit log"],
    businessRules: [
      "Only verified purchasers can review a product.",
      "Duplicate reviews, edited reviews, and policy-blocked reviews need explicit handling.",
    ],
    diagramIds: ["review-moderation-flow", "marketplace-discord-class-model", "moderation-flow"],
  },
  "discord-automation": {
    category: "integration",
    priority: "High",
    sectionRef: "Feature extension 2.2 and UC-30 to UC-32",
    actors: ["User", "Admin", "System", "Discord OAuth", "Discord Bot", "Discord Server", "Stripe", "PayHere"],
    features: [
      "Link Dekonstrukt accounts to Discord identities through OAuth verification.",
      "Assign and remove Gold, Platinum, and Diamond Discord roles from subscription events.",
      "Store sync jobs and logs for troubleshooting, retries, and manual admin recovery.",
    ],
    useCases: ["UC-30 Connect Discord Account", "UC-31 Sync Subscription to Discord Roles", "UC-32 Revoke or Downgrade Discord Access"],
    entities: ["DiscordAccountLink", "DiscordRoleMapping", "DiscordSyncJob", "DiscordSyncLog", "DiscordGuildConfig", "SubscriptionPlan"],
    integrations: ["Discord OAuth", "Discord Bot", "Discord Server", "Stripe", "PayHere"],
    businessRules: [
      "Platinum includes Gold access; Diamond includes Platinum and Gold access.",
      "Expired, cancelled, refunded, or downgraded subscriptions must remove roles no longer allowed.",
      "Bot permission failures, unlinked accounts, and missing guild membership must surface recovery states.",
    ],
    diagramIds: ["discord-role-sync-flow", "discord-revoke-flow", "discord-sync-sequence", "marketplace-discord-class-model", "system-subsystems"],
  },
  "monthly-reporting": {
    category: "analysis",
    priority: "High",
    sectionRef: "Feature extension 2.3 and UC-33",
    actors: ["Moderator", "Admin", "System"],
    features: [
      "Aggregate monthly financial, content, moderation, growth, marketplace, Discord sync, and operational metrics.",
      "Compute totals, trend lines, top items, exceptions, dashboard view, exports, and archived report records.",
    ],
    useCases: ["UC-33 Generate Monthly Platform Report"],
    entities: ["MonthlyPlatformReport", "ReportMetric", "ReportSection", "PaymentTransaction", "Order", "Report", "AnalyticsRecord"],
    integrations: ["Export service", "Analytics pipeline", "Payment database"],
    businessRules: [
      "Report scope must be selected before aggregation.",
      "Generated reports should be archived and remain downloadable or reviewable later.",
    ],
    diagramIds: ["monthly-report-flow", "core-class-model", "system-subsystems"],
  },
  "music-upload-release-scheduling": {
    actors: ["Artist", "Admin", "Moderator"],
    useCases: ["Upload track(Authorized roles only)", "Edit track metadata", "Schedule release"],
    entities: ["Track", "Artist", "RevenueSplit"],
    diagramIds: ["artist-upload-flow", "core-class-model"],
  },
  "reporting-moderation": {
    useCases: ["Report abusive content", "Review report", "Escalate case"],
    entities: ["Report", "User", "Moderator"],
    diagramIds: ["moderation-flow", "core-class-model"],
  },
  "discord-membership-tiers": {
    actors: ["User", "Admin", "System", "Discord Bot"],
    useCases: ["Sync subscription to Discord roles", "Revoke or downgrade Discord access"],
    entities: ["SubscriptionPlan", "DiscordRoleMapping", "DiscordSyncJob"],
    integrations: ["Discord Bot", "Discord Server"],
    businessRules: ["Gold, Platinum, and Diamond tiers map directly to cumulative Discord access."],
    diagramIds: ["discord-role-sync-flow", "discord-revoke-flow", "discord-sync-sequence"],
  },
};

const diagramCatalog = [
  {
    id: "overall-use-case",
    type: "use-case",
    title: "Overall Platform Use Cases",
    summary:
      "A single actor/use-case map for the original system plus the marketplace, Discord, and reporting extension.",
    chart: `flowchart LR
  User["User"] --> UCAuth["Register, Login, Profile"]
  User --> UCStream["Stream, Playlist, Discover"]
  User --> UCSocial["Follow, Comment, Share, Report"]
  User --> UCPay["Subscribe or Purchase"]
  User --> UCMarket["Browse Marketplace"]
  User --> UCDiscord["Connect Discord"]
  Artist["Artist"] --> UCArtist["Manage Artist Profile"]
  Artist --> UCPublish["Publish Marketplace Product"]
  Moderator["Moderator"] --> UCReports["Review Reports"]
  Moderator --> UCReviews["Moderate Product Reviews"]
  Moderator --> UCMonthly["Generate Monthly Report"]
  Admin[Admin] --> UCRoles["Manage Roles and Artists"]
  Admin --> UCUpload["Upload and Schedule Tracks"]
  Admin --> UCRevenue["View Revenue and Analytics"]
  Admin --> UCSystem["Monitor System"]
  Stripe["Stripe"] --> UCPay
  PayHere["PayHere"] --> UCPay
  Discord["Discord OAuth and Bot"] --> UCDiscord`,
  },
  {
    id: "registration-flow",
    type: "flow",
    title: "Registration and Role Dashboard Flow",
    summary: "Account creation, credential validation, role detection, and role-specific routing.",
    chart: `flowchart TD
  A["User opens sign up or login"] --> B{"New account?"}
  B -->|Yes| C["Enter registration details"]
  C --> D["System validates input and duplicate email"]
  D --> E["Create account and send verification"]
  B -->|No| F["Enter credentials"]
  F --> G["System validates credentials"]
  E --> H["Determine role"]
  G --> H
  H --> I{"Role"}
  I -->|User| J["Listener home"]
  I -->|Artist| K["Artist dashboard"]
  I -->|Moderator| L["Moderation dashboard"]
  I -->|Admin| M["Admin console"]`,
  },
  {
    id: "artist-upload-flow",
    type: "flow",
    title: "Artist Track Upload and Release Flow",
    summary: "Track file, metadata, release scheduling, collaborator, and revenue split path.",
    chart: `flowchart TD
  A["Authorized role opens dashboard"] --> B["Upload audio file"]
  B --> C["Add title, genre, tags, cover art, and description"]
  C --> D{"Valid format and metadata?"}
  D -->|No| E["Show validation errors"]
  D -->|Yes| F["Store track and assets"]
  F --> G{"Schedule release?"}
  G -->|Yes| H["Save release date"]
  G -->|No| I["Set draft or publish status"]
  H --> J["Add collaborators and revenue splits"]
  I --> J
  J --> K["Publish, schedule, or keep draft"]
  K --> L["Update analytics and artist catalog"]`,
  },
  {
    id: "payment-revenue-flow",
    type: "flow",
    title: "Payments and Centralized Revenue Flow",
    summary: "Stripe and PayHere payment events normalize into one transaction and revenue layer.",
    chart: `flowchart TD
  A["User selects paid item or subscription"] --> B["System creates payment request"]
  B --> C{"Provider"}
  C -->|Stripe| D["Stripe processes transaction"]
  C -->|PayHere| E["PayHere processes transaction"]
  D --> F["Backend validates webhook"]
  E --> G["Backend validates callback"]
  F --> H{"Valid and not duplicate?"}
  G --> H
  H -->|No| I["Record failure or exception"]
  H -->|Yes| J["Normalize PaymentTransaction"]
  J --> K["Create entitlement or subscription"]
  J --> L["Update revenue dashboard"]
  L --> M["Admin views centralized revenue"]`,
  },
  {
    id: "stem-separation-flow",
    type: "flow",
    title: "AI Stem Separation Flow",
    summary: "Track selection, AI processing, preview controls, and premium export handling.",
    chart: `flowchart TD
  A["User selects track or uploads audio"] --> B["System checks access level"]
  B --> C["Create StemJob"]
  C --> D["AI processor separates stems"]
  D --> E{"Processing complete?"}
  E -->|No| F["Show status or failure"]
  E -->|Yes| G["Store stem output files"]
  G --> H["Render mixer controls"]
  H --> I{"Premium export allowed?"}
  I -->|No| J["Preview only"]
  I -->|Yes| K["Allow download or export"]
  K --> L["Record usage analytics"]`,
  },
  {
    id: "moderation-flow",
    type: "flow",
    title: "Content and User Moderation Flow",
    summary: "User reports, moderator review, admin escalation, and audit logging.",
    chart: `flowchart TD
  A["User reports content or account"] --> B["System stores report"]
  B --> C["Moderator opens queue"]
  C --> D["Inspect report, target, and history"]
  D --> E{"Severity"}
  E -->|Low| F["Dismiss or warn"]
  E -->|Medium| G["Hide, remove, or restrict"]
  E -->|High| H["Escalate to Admin"]
  H --> I["Admin makes final action"]
  F --> J["Log action"]
  G --> J
  I --> J
  J --> K["Notify affected users if required"]`,
  },
  {
    id: "marketplace-purchase-flow",
    type: "flow",
    title: "Marketplace Purchase and Download Flow",
    summary: "Product browsing, checkout, provider validation, entitlement creation, and secure download access.",
    chart: `flowchart TD
  A["User opens marketplace"] --> B["Filter products by type, genre, compatibility, price, rating"]
  B --> C["Open product detail page"]
  C --> D["Add product to cart"]
  D --> E["System validates price and availability"]
  E --> F{"Payment provider"}
  F -->|Stripe| G["Stripe processes transaction"]
  F -->|PayHere| H["PayHere processes transaction"]
  G --> I["Backend validates webhook"]
  H --> I
  I --> J{"Payment valid?"}
  J -->|No| K["Show payment failure"]
  J -->|Yes| L["Create order and order items"]
  L --> M["Grant DownloadEntitlement"]
  M --> N["User downloads owned product"]
  N --> O["Record revenue and marketplace analytics"]`,
  },
  {
    id: "review-moderation-flow",
    type: "flow",
    title: "Product Review Submission and Moderation Flow",
    summary: "Verified purchase review, policy checks, moderation decisions, and rating recalculation.",
    chart: `flowchart TD
  A["Purchasing user opens owned product"] --> B["Submit rating and written review"]
  B --> C["System verifies entitlement"]
  C --> D{"Entitled and policy clean?"}
  D -->|No| E["Block or queue review"]
  D -->|Yes| F["Publish review"]
  F --> G["Recalculate rating summary"]
  E --> H["Moderator reviews queue"]
  G --> I{"Review reported?"}
  I -->|No| J["Review remains visible"]
  I -->|Yes| H
  H --> K{"Decision"}
  K -->|Dismiss| J
  K -->|Hide or remove| L["Update review state"]
  K -->|Escalate| M["Admin review"]
  L --> N["Log action and notify if required"]
  M --> N`,
  },
  {
    id: "discord-role-sync-flow",
    type: "flow",
    title: "Subscription to Discord Role Assignment Flow",
    summary: "Subscription event, Discord linking, tier hierarchy, bot assignment, and sync logging.",
    chart: `flowchart TD
  A["User selects Gold, Platinum, or Diamond"] --> B["Payment completes through Stripe or PayHere"]
  B --> C["Backend activates subscription"]
  C --> D{"Discord linked?"}
  D -->|No| E["Prompt user to connect Discord"]
  E --> F["Discord OAuth verifies identity"]
  D -->|Yes| G["Create DiscordSyncJob"]
  F --> G
  G --> H["Bot identifies member in server"]
  H --> I{"Tier"}
  I -->|Gold| J["Assign Gold"]
  I -->|Platinum| K["Assign Platinum and Gold"]
  I -->|Diamond| L["Assign Diamond, Platinum, and Gold"]
  J --> M["Store sync result"]
  K --> M
  L --> M
  M --> N["Notify user or admin if recovery needed"]`,
  },
  {
    id: "discord-revoke-flow",
    type: "flow",
    title: "Discord Downgrade and Revocation Flow",
    summary: "Cancellation, expiry, refund, downgrade, and removal of roles no longer allowed.",
    chart: `flowchart TD
  A["Subscription expires, cancels, refunds, or downgrades"] --> B["Backend updates subscription status"]
  B --> C["Create DiscordSyncJob"]
  C --> D["Bot loads active tier and current roles"]
  D --> E["Remove roles no longer allowed"]
  E --> F["Preserve lower-tier roles still entitled"]
  F --> G["Write DiscordSyncLog"]
  G --> H{"Action required?"}
  H -->|No| I["Notify success"]
  H -->|Yes| J["Surface recovery state to admin"]`,
  },
  {
    id: "monthly-report-flow",
    type: "flow",
    title: "Monthly Platform Report Generation Flow",
    summary: "Month-end operational report across finance, moderation, growth, content, marketplace, and Discord.",
    chart: `flowchart TD
  A["Moderator or Admin selects month and scope"] --> B["Gather financial metrics"]
  B --> C["Gather moderation metrics"]
  C --> D["Gather growth metrics"]
  D --> E["Gather content and marketplace metrics"]
  E --> F["Gather Discord sync and operational exceptions"]
  F --> G["Compute totals, trends, top items, and exceptions"]
  G --> H["Render dashboard report"]
  H --> I["Export PDF or CSV"]
  I --> J["Archive MonthlyPlatformReport"]`,
  },
  {
    id: "payment-sequence",
    type: "sequence",
    title: "Payment Provider Sequence",
    summary: "Provider-agnostic checkout sequence for Stripe and PayHere callbacks.",
    chart: `sequenceDiagram
  participant U as User
  participant App as Dekonstrukt App
  participant API as Backend API
  participant Pay as Stripe or PayHere
  participant DB as Revenue Database
  U->>App: Select paid product or plan
  App->>API: Create payment request
  API->>Pay: Initialize payment
  Pay-->>U: Complete checkout
  Pay->>API: Webhook or callback
  API->>API: Validate signature and idempotency
  API->>DB: Store normalized PaymentTransaction
  API->>DB: Grant subscription or entitlement
  API-->>App: Return confirmation
  App-->>U: Show access and receipt`,
  },
  {
    id: "discord-sync-sequence",
    type: "sequence",
    title: "Discord Role Sync Sequence",
    summary: "OAuth link plus bot sync for subscription tier access.",
    chart: `sequenceDiagram
  participant U as User
  participant App as Dekonstrukt App
  participant API as Backend API
  participant OAuth as Discord OAuth
  participant Bot as Discord Bot
  participant Guild as Discord Server
  U->>App: Connect Discord
  App->>OAuth: Redirect for authorization
  OAuth-->>API: Return verified identity token
  API->>API: Store DiscordAccountLink
  API->>Bot: Execute DiscordSyncJob
  Bot->>Guild: Find member and current roles
  Bot->>Guild: Assign or remove tier roles
  Guild-->>Bot: Role update result
  Bot-->>API: Sync result and errors
  API->>API: Store DiscordSyncLog
  API-->>App: Show sync status`,
  },
  {
    id: "core-class-model",
    type: "class",
    title: "Core Class Model",
    summary: "Primary entities from the original platform brief.",
    chart: `classDiagram
  class User {
    +String userId
    +String email
    +String role
    +register()
    +login()
    +updateProfile()
  }
  class Artist {
    +String artistName
    +String verificationStatus
 
  }
  class Admin {
    +createArtistProfile()
    +assignRole()
    +monitorSystem()
    +uploadTrack()
    +scheduleRelease()
    +viewAnalytics()
  }
  class Moderator {
    +reviewReport()
    +removeContent()
    +escalateCase()
    +scheduleRelease()
  }
  class Track {
    +String trackId
    +String title
    +String genre
    +publish()
    +updateMetadata()
  }
  class Playlist {
    +addTrack()
    +removeTrack()
  }
  class Subscription {
    +String tier
    +String status
  }
  class PaymentTransaction {
    +String provider
    +Float amountGross
    +validateCallback()
    +normalize()
  }
  class StemJob {
    +String status
    +process()
  }
  User <|-- Artist
  User <|-- Admin
  User <|-- Moderator
  Artist "1" --> "*" Track
  User "1" --> "*" Playlist
  User "1" --> "*" Subscription
  Subscription "1" --> "*" PaymentTransaction
  Track "1" --> "*" StemJob`,
  },
  {
    id: "marketplace-discord-class-model",
    type: "class",
    title: "Marketplace and Discord Extension Classes",
    summary: "New classes required by marketplace commerce, product reviews, entitlements, Discord sync, and monthly reporting.",
    chart: `classDiagram
  class MarketplaceProduct {
    +String productId
    +String productType
    +Float price
    +publish()
    +attachAssets()
  }
  class ProductAsset {
    +String assetType
    +String checksum
    +createDownloadLink()
  }
  class Order {
    +String status
    +confirmOrder()
  }
  class OrderItem {
    +Float unitPrice
    +calculateLineTotal()
  }
  class DownloadEntitlement {
    +String status
    +grantAccess()
    +recordDownload()
  }
  class ProductReview {
    +Int rating
    +String status
    +submit()
    +hide()
  }
  class DiscordAccountLink {
    +String discordUserId
    +verifyMembership()
  }
  class DiscordSyncJob {
    +String triggerType
    +execute()
    +retry()
  }
  class DiscordRoleMapping {
    +String subscriptionTier
    +mapTierToRoles()
  }
  class MonthlyPlatformReport {
    +String reportMonth
    +generate()
    +exportPDF()
  }
  MarketplaceProduct "1" --> "*" ProductAsset
  Order "1" --> "*" OrderItem
  OrderItem "*" --> "1" MarketplaceProduct
  Order "1" --> "*" DownloadEntitlement
  MarketplaceProduct "1" --> "*" ProductReview
  DiscordAccountLink "1" --> "*" DiscordSyncJob
  DiscordRoleMapping "1" --> "*" DiscordSyncJob
  MonthlyPlatformReport "1" --> "*" Order`,
  },
  {
    id: "system-subsystems",
    type: "system",
    title: "Suggested System Subsystems",
    summary: "A product architecture view for grouping modules into coherent implementation areas.",
    chart: `flowchart TB
  Client["Web and mobile client"] --> Auth["Auth and Role Access"]
  Client --> Music["Streaming and Music Catalog"]
  Client --> ArtistOps["Artist and Release Management"]
  Client --> Community["Community and Moderation"]
  Client --> Commerce["Payments, Marketplace, Entitlements"]
  Client --> Analytics["Analytics and Monthly Reporting"]
  Music --> Stem["AI Stem Separation"]
  Commerce --> Stripe["Stripe"]
  Commerce --> PayHere["PayHere"]
  Commerce --> Revenue["Central Revenue Database"]
  Commerce --> Discord["Discord Automation"]
  Discord --> OAuth["Discord OAuth"]
  Discord --> Bot["Discord Bot"]
  Analytics --> Reports["Archived Reports and Exports"]
  Community --> Audit["Audit Logs"]`,
  },
  {
    id: "central-platform-architecture",
    type: "architecture",
    title: "Centralized Platform Architecture",
    summary:
      "Recommended production stack view for the complete Dekonstrukt platform across clients, APIs, modules, data stores, queues, integrations, AI, and observability.",
    tags: ["Frontend", "Backend", "Database", "Queue", "Integration", "AI", "Analytics"],
    chart: `flowchart LR
  subgraph Clients["Client Apps"]
    Web["React / Next.js Web App"]
    AdminUI["Admin and Moderator Console"]
    ArtistUI["Artist Dashboard"]
  end
  subgraph Edge["Edge and API Layer"]
    CDN["CDN / WAF"]
    Gateway["API Gateway"]
    BFF["NestJS BFF / REST API"]
    Auth["Auth and RBAC"]
  end
  subgraph Domain["Domain Services"]
    Catalog["Music Catalog Service"]
    ArtistSvc["Artist and Release Service"]
    StreamSvc["Streaming Service"]
    StemSvc["AI Stem Service"]
    Discovery["Discovery Service"]
    Community["Community and Moderation Service"]
    Commerce["Payments, Subscriptions, Marketplace"]
    Reporting["Analytics and Monthly Reporting"]
    DiscordSvc["Discord Automation Service"]
  end
  subgraph Data["Data and Async Layer"]
    Postgres["PostgreSQL"]
    Redis["Redis Cache"]
    Queue["BullMQ / Redis Queue"]
    ObjectStore["S3-compatible Object Storage"]
    Search["Search Index"]
    Warehouse["Analytics Warehouse"]
  end
  subgraph External["External Integrations"]
    Stripe["Stripe"]
    PayHere["PayHere"]
    Discord["Discord OAuth / Bot"]
    AIWorker["AI Stem Processor"]
    Email["Email / Notifications"]
  end
  Web --> CDN --> Gateway --> BFF
  AdminUI --> CDN
  ArtistUI --> CDN
  BFF --> Auth
  BFF --> Catalog
  BFF --> ArtistSvc
  BFF --> StreamSvc
  BFF --> Discovery
  BFF --> Community
  BFF --> Commerce
  BFF --> Reporting
  BFF --> DiscordSvc
  Catalog --> Postgres
  ArtistSvc --> Postgres
  Community --> Postgres
  Commerce --> Postgres
  Reporting --> Warehouse
  StreamSvc --> ObjectStore
  StemSvc --> Queue --> AIWorker
  StemSvc --> ObjectStore
  Discovery --> Search
  BFF --> Redis
  Commerce --> Stripe
  Commerce --> PayHere
  DiscordSvc --> Discord
  Reporting --> Postgres
  BFF --> Email`,
  },
  {
    id: "auth-profile-architecture",
    type: "architecture",
    title: "Auth, RBAC, and Profile Architecture",
    summary: "Authentication, role-based routing, user profiles, artist profiles, and admin-created artist accounts.",
    tags: ["Frontend", "Backend", "Database"],
    chart: `flowchart TD
  Client["React / Next.js Client"] --> AuthUI["Login, Sign Up, Profile UI"]
  AuthUI --> API["NestJS Auth/Profile API"]
  API --> AuthSvc["Auth Service"]
  API --> ProfileSvc["Profile Service"]
  AuthSvc --> Token["JWT / Session Strategy"]
  AuthSvc --> RBAC["RBAC Guard"]
  ProfileSvc --> UserDB["PostgreSQL Users"]
  ProfileSvc --> ArtistDB["PostgreSQL Artist Profiles"]
  ProfileSvc --> Media["Object Storage Avatars / Media"]
  RBAC --> Dashboards["Role-specific Dashboards"]`,
  },
  {
    id: "artist-content-architecture",
    type: "architecture",
    title: "Artist Content and Release Architecture",
    summary: "Track uploads, metadata editing, release scheduling, collaborator splits, and artist analytics.",
    tags: ["Frontend", "Backend", "Database", "Queue"],
    chart: `flowchart TD
  ArtistUI["Artist Dashboard"] --> UploadAPI["NestJS Artist Content API"]
  UploadAPI --> FileValidator["Audio and Metadata Validation"]
  FileValidator --> ObjectStore["Object Storage WAV / MP3 / FLAC / Covers"]
  UploadAPI --> CatalogDB["PostgreSQL Tracks and Releases"]
  UploadAPI --> SplitDB["PostgreSQL Revenue Splits"]
  UploadAPI --> Queue["Release Scheduler Queue"]
  Queue --> Publisher["Release Publisher Worker"]
  Publisher --> CatalogDB
  CatalogDB --> Analytics["Analytics Events"]
  Analytics --> ArtistInsights["Artist Analytics Dashboard"]`,
  },
  {
    id: "streaming-playlist-architecture",
    type: "architecture",
    title: "Streaming and Playlist Architecture",
    summary: "Waveform playback, queues, playlists, listening history, premium checks, and audio delivery.",
    tags: ["Frontend", "Backend", "Database", "Analytics"],
    chart: `flowchart TD
  Player["React Waveform Player"] --> StreamAPI["Streaming API"]
  Player --> PlaylistUI["Playlist / Queue UI"]
  StreamAPI --> Entitlement["Subscription and Access Check"]
  StreamAPI --> AudioStore["Object Storage / CDN Audio"]
  StreamAPI --> TrackDB["PostgreSQL Tracks"]
  PlaylistUI --> PlaylistAPI["Playlist API"]
  PlaylistAPI --> PlaylistDB["PostgreSQL Playlists"]
  StreamAPI --> History["Listening History Events"]
  History --> Analytics["Analytics Warehouse"]
  Entitlement --> SubscriptionDB["PostgreSQL Subscriptions"]`,
  },
  {
    id: "stem-ai-architecture",
    type: "architecture",
    title: "AI Stem Separation Architecture",
    summary: "Upload/select track, enqueue AI processing, store stems, expose preview/export, and track premium access.",
    tags: ["Backend", "Queue", "AI", "Database"],
    chart: `flowchart TD
  Client["Stem Separation UI"] --> StemAPI["NestJS Stem API"]
  StemAPI --> Access["Premium Access Check"]
  StemAPI --> StemDB["PostgreSQL StemJob"]
  StemAPI --> Queue["BullMQ Stem Queue"]
  Queue --> Worker["GPU / AI Stem Worker"]
  Worker --> Input["Audio from Object Storage"]
  Worker --> Output["Separated Stem Files"]
  Output --> ObjectStore["Object Storage"]
  Worker --> StemDB
  StemAPI --> Mixer["Stem Mixer Preview / Export"]`,
  },
  {
    id: "discovery-recommendation-architecture",
    type: "architecture",
    title: "Discovery and Recommendation Architecture",
    summary: "Personalized feed, genre browsing, charts, weekly playlists, feedback loops, and search index.",
    tags: ["Backend", "Database", "Analytics"],
    chart: `flowchart TD
  Client["Discovery UI"] --> DiscoveryAPI["Discovery API"]
  DiscoveryAPI --> Recommendation["Recommendation Service"]
  Recommendation --> Behavior["Listening / Follow / Like Events"]
  Behavior --> Warehouse["Analytics Warehouse"]
  Recommendation --> Search["Search Index"]
  Recommendation --> Catalog["Track and Artist Catalog"]
  Catalog --> Postgres["PostgreSQL"]
  DiscoveryAPI --> Charts["Charts and Trending Service"]
  Charts --> Warehouse
  Client --> Feedback["Recommendation Feedback"]
  Feedback --> Warehouse`,
  },
  {
    id: "community-moderation-architecture",
    type: "architecture",
    title: "Community and Moderation Architecture",
    summary: "Follows, likes, comments, notifications, abuse reports, moderation queues, and audit logs.",
    tags: ["Frontend", "Backend", "Database", "Integration"],
    chart: `flowchart TD
  Client["Community UI"] --> CommunityAPI["Community API"]
  CommunityAPI --> SocialDB["PostgreSQL Likes / Comments / Follows"]
  CommunityAPI --> ReportDB["PostgreSQL Reports"]
  CommunityAPI --> Notify["Notification Service"]
  Notify --> Email["Email / In-app Notifications"]
  Moderator["Moderator Console"] --> ModerationAPI["Moderation API"]
  ModerationAPI --> Queue["Report and Review Queues"]
  Queue --> Decision["Dismiss / Hide / Remove / Escalate"]
  Decision --> Audit["Audit Log"]
  Decision --> SocialDB
  Decision --> ReportDB`,
  },
  {
    id: "payments-revenue-architecture",
    type: "architecture",
    title: "Payments, Subscriptions, and Revenue Architecture",
    summary: "Stripe and PayHere checkout, webhook validation, subscription state, revenue normalization, and entitlement grants.",
    tags: ["Backend", "Database", "Integration"],
    chart: `flowchart TD
  Client["Checkout / Subscription UI"] --> CommerceAPI["Commerce API"]
  CommerceAPI --> PaymentIntent["Payment Request Builder"]
  PaymentIntent --> Stripe["Stripe"]
  PaymentIntent --> PayHere["PayHere"]
  Stripe --> Webhook["Webhook Receiver"]
  PayHere --> Callback["Callback Receiver"]
  Webhook --> Validator["Signature / Idempotency Validation"]
  Callback --> Validator
  Validator --> TxDB["PostgreSQL PaymentTransaction"]
  Validator --> SubscriptionDB["PostgreSQL Subscriptions"]
  Validator --> EntitlementDB["PostgreSQL Entitlements"]
  TxDB --> Revenue["Central Revenue Dashboard"]
  Revenue --> Analytics["Analytics Warehouse"]`,
  },
  {
    id: "marketplace-entitlement-architecture",
    type: "architecture",
    title: "Marketplace, Reviews, and Download Entitlement Architecture",
    summary: "Plugin products, sample packs, carts, orders, verified reviews, secure downloads, and marketplace analytics.",
    tags: ["Frontend", "Backend", "Database", "Integration"],
    chart: `flowchart TD
  Storefront["Marketplace UI"] --> MarketAPI["Marketplace API"]
  MarketAPI --> ProductDB["PostgreSQL MarketplaceProduct"]
  MarketAPI --> AssetStore["Object Storage Product Assets"]
  Storefront --> Cart["Cart / Checkout"]
  Cart --> CommerceAPI["Commerce API"]
  CommerceAPI --> OrderDB["PostgreSQL Orders / OrderItems"]
  CommerceAPI --> EntitlementDB["PostgreSQL DownloadEntitlement"]
  EntitlementDB --> DownloadAPI["Secure Download API"]
  DownloadAPI --> AssetStore
  Storefront --> ReviewAPI["Review API"]
  ReviewAPI --> PurchaseCheck["Verified Purchase Check"]
  PurchaseCheck --> EntitlementDB
  ReviewAPI --> ReviewDB["PostgreSQL ProductReview / ReviewReport"]
  ReviewDB --> Moderation["Review Moderation Queue"]
  MarketAPI --> Analytics["Marketplace Analytics"]`,
  },
  {
    id: "discord-automation-architecture",
    type: "architecture",
    title: "Discord Subscription Automation Architecture",
    summary: "Discord OAuth linking, subscription-triggered role sync, hierarchy enforcement, retry jobs, and sync logs.",
    tags: ["Backend", "Queue", "Integration", "Database"],
    chart: `flowchart TD
  Client["Account Settings UI"] --> DiscordAPI["Discord Link API"]
  DiscordAPI --> OAuth["Discord OAuth"]
  OAuth --> LinkDB["PostgreSQL DiscordAccountLink"]
  SubscriptionEvent["Subscription Event"] --> SyncAPI["Discord Sync Service"]
  SyncAPI --> PlanDB["SubscriptionPlan / RoleMapping"]
  SyncAPI --> Queue["Discord Sync Queue"]
  Queue --> Bot["Discord Bot Worker"]
  Bot --> Guild["Discord Server / Guild"]
  Bot --> LogDB["DiscordSyncJob / DiscordSyncLog"]
  LogDB --> Admin["Admin Recovery UI"]`,
  },
  {
    id: "analytics-reporting-architecture",
    type: "architecture",
    title: "Analytics and Monthly Reporting Architecture",
    summary: "Event collection, monthly aggregation, operational metrics, dashboard rendering, exports, and report archives.",
    tags: ["Backend", "Database", "Queue", "Analytics"],
    chart: `flowchart TD
  Services["Platform Services"] --> Events["Analytics Event Stream"]
  Events --> Warehouse["Analytics Warehouse"]
  AdminUI["Admin / Moderator Reporting UI"] --> ReportAPI["Reporting API"]
  ReportAPI --> Aggregator["Monthly Aggregation Worker"]
  Aggregator --> Finance["Payment and Order Metrics"]
  Aggregator --> Moderation["Moderation Metrics"]
  Aggregator --> Growth["User / Artist Growth Metrics"]
  Aggregator --> Content["Track / Product / Stem Metrics"]
  Finance --> ReportDB["PostgreSQL MonthlyPlatformReport"]
  Moderation --> ReportDB
  Growth --> ReportDB
  Content --> ReportDB
  ReportDB --> Export["PDF / CSV Export Service"]
  Export --> Archive["Report Archive Storage"]`,
  },
  {
    id: "admin-monitoring-architecture",
    type: "architecture",
    title: "Admin and System Monitoring Architecture",
    summary: "Admin governance, system health, audit logging, operational alerts, and observability surfaces.",
    tags: ["Backend", "Database", "Analytics", "Integration"],
    chart: `flowchart TD
  AdminUI["Admin Console"] --> AdminAPI["Admin API"]
  AdminAPI --> RBAC["Admin RBAC Guard"]
  AdminAPI --> UserMgmt["User / Artist / Role Management"]
  AdminAPI --> ContentMgmt["Content and Category Management"]
  AdminAPI --> Revenue["Revenue and KPI Dashboards"]
  AdminAPI --> Health["System Health Service"]
  UserMgmt --> Postgres["PostgreSQL"]
  ContentMgmt --> Postgres
  Revenue --> Warehouse["Analytics Warehouse"]
  Health --> Observability["Logs / Metrics / Traces"]
  Observability --> Alerts["Operational Alerts"]
  AdminAPI --> Audit["Audit Log"]
  Alerts --> AdminUI`,
  },
];

const diagramTabs = [
  { type: "use-case", label: "Use Case" },
  { type: "flow", label: "Flow" },
  { type: "sequence", label: "Sequence" },
  { type: "class", label: "Class" },
  { type: "system", label: "Subsystems" },
  { type: "architecture", label: "Architecture" },
];

const architectureDiagramIdsByNode = {
  root: [
    "central-platform-architecture",
    "auth-profile-architecture",
    "artist-content-architecture",
    "streaming-playlist-architecture",
    "stem-ai-architecture",
    "discovery-recommendation-architecture",
    "community-moderation-architecture",
    "payments-revenue-architecture",
    "marketplace-entitlement-architecture",
    "discord-automation-architecture",
    "analytics-reporting-architecture",
    "admin-monitoring-architecture",
  ],
  "artist-platform": ["central-platform-architecture", "artist-content-architecture"],
  "event-management": ["central-platform-architecture", "artist-content-architecture", "payments-revenue-architecture"],
  "streaming-audio": ["central-platform-architecture", "streaming-playlist-architecture"],
  "stem-separation": ["central-platform-architecture", "stem-ai-architecture"],
  "discovery-engine": ["central-platform-architecture", "discovery-recommendation-architecture"],
  "community-social": ["central-platform-architecture", "community-moderation-architecture"],
  monetization: ["central-platform-architecture", "payments-revenue-architecture"],
  "analytics-dashboard": ["central-platform-architecture", "analytics-reporting-architecture"],
  "admin-moderation": ["central-platform-architecture", "admin-monitoring-architecture", "community-moderation-architecture"],
  "plugin-marketplace": ["central-platform-architecture", "marketplace-entitlement-architecture", "payments-revenue-architecture"],
  "download-entitlements": ["central-platform-architecture", "marketplace-entitlement-architecture"],
  "product-reviews": ["central-platform-architecture", "marketplace-entitlement-architecture", "community-moderation-architecture"],
  "discord-automation": ["central-platform-architecture", "discord-automation-architecture"],
  "monthly-reporting": ["central-platform-architecture", "analytics-reporting-architecture"],
  "artist-overview": ["artist-content-architecture"],
  "music-upload-release-scheduling": ["artist-content-architecture"],
  "artist-profiles": ["auth-profile-architecture", "artist-content-architecture"],
  "waveform-player": ["streaming-playlist-architecture"],
  "playlists-dj-sets": ["streaming-playlist-architecture"],
  "stem-overview": ["stem-ai-architecture"],
  "marketplace-storefront": ["marketplace-entitlement-architecture"],
  "marketplace-product-publishing": ["marketplace-entitlement-architecture"],
  "verified-product-reviews": ["marketplace-entitlement-architecture"],
  "review-moderation-queue": ["community-moderation-architecture", "marketplace-entitlement-architecture"],
  "discord-account-linking": ["discord-automation-architecture", "auth-profile-architecture"],
  "discord-role-sync": ["discord-automation-architecture"],
  "monthly-revenue-summary": ["analytics-reporting-architecture", "payments-revenue-architecture"],
  "monthly-governance-summary": ["analytics-reporting-architecture"],
};

function mergeExtensionNodes(children) {
  const insertIndex = children.findIndex((child) => child.id === "why-it-stands-out");
  if (insertIndex === -1) return [...children, ...extensionNodes];
  return [
    ...children.slice(0, insertIndex),
    ...extensionNodes,
    ...children.slice(insertIndex),
  ];
}

function getDefaultCategory(type) {
  switch (type) {
    case "core-feature":
      return "core";
    case "extension-feature":
      return "extension";
    case "integration":
      return "integration";
    case "governance":
    case "rule":
      return "governance";
    case "metric":
    case "reporting":
      return "analysis";
    default:
      return "support";
  }
}

function inheritSpec(spec) {
  return {
    actors: spec.actors,
    category: spec.category,
    diagramIds: spec.diagramIds,
    entities: spec.entities,
    integrations: spec.integrations,
    priority: spec.priority,
    sectionRef: spec.sectionRef,
  };
}

function hydrateNode(node, inherited = {}) {
  const override = nodeSpecOverrides[node.id] || {};
  const childTitles = (node.children || []).slice(0, 5).map((child) => child.title);
  const spec = {
    ...node,
    ...override,
    title: override.title || node.title,
    description: override.description || node.description,
    summary: override.summary || node.summary || node.description,
    category: override.category || node.category || inherited.category || getDefaultCategory(node.type),
    priority:
      override.priority ||
      node.priority ||
      inherited.priority ||
      (node.type === "core-feature" ? "High" : "Medium"),
    sectionRef: override.sectionRef || node.sectionRef || inherited.sectionRef,
    actors: override.actors || node.actors || inherited.actors || [],
    entities: override.entities || node.entities || inherited.entities || [],
    integrations: override.integrations || node.integrations || inherited.integrations || [],
    diagramIds: override.diagramIds || node.diagramIds || inherited.diagramIds || [],
    businessRules: override.businessRules || node.businessRules || [],
    features: override.features || node.features || childTitles,
    useCases: override.useCases || node.useCases || [],
  };

  return {
    ...spec,
    children: (node.children || []).map((child) => hydrateNode(child, inheritSpec(spec))),
  };
}

function withDefaultDiagramRelationships(node) {
  const architectureIds = architectureDiagramIdsByNode[node.id] || [];
  const diagramIds = Array.from(new Set([...(node.diagramIds || []), ...architectureIds]));
  return {
    ...node,
    diagramIds,
    children: (node.children || []).map(withDefaultDiagramRelationships),
  };
}

const specMindMapData = withDefaultDiagramRelationships(
  hydrateNode({
    ...mindMapData,
    title: "Dekonstrukt",
    description:
      "A unified music-label platform specification covering the original brief and the feature extension as one product model.",
    children: mergeExtensionNodes(mindMapData.children),
  }),
);

const MAP_STORAGE_KEY = "dekonstrukt-spec-map-data-v1";
const PANEL_STORAGE_KEY = "dekonstrukt-spec-panel-width-v1";
const editableListFields = [
  "actors",
  "features",
  "useCases",
  "entities",
  "integrations",
  "businessRules",
  "diagramIds",
];

function cloneData(value) {
  return JSON.parse(JSON.stringify(value));
}

function loadStoredMap() {
  try {
    const stored = window.localStorage.getItem(MAP_STORAGE_KEY);
    return stored ? withDefaultDiagramRelationships(JSON.parse(stored)) : cloneData(specMindMapData);
  } catch {
    return cloneData(specMindMapData);
  }
}

function loadStoredPanelWidth() {
  try {
    const stored = Number(window.localStorage.getItem(PANEL_STORAGE_KEY));
    return Number.isFinite(stored) && stored >= 35 && stored <= 68 ? stored : 48;
  } catch {
    return 48;
  }
}

function listToText(items) {
  return (items || []).join("\n");
}

function textToList(value) {
  return String(value || "")
    .split(/\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function createSlug(value) {
  const slug = String(value || "new-section")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || "new-section";
}

function createIdFromTitle(title) {
  return `${createSlug(title)}-${Math.random().toString(36).slice(2, 7)}`;
}

function nodeToForm(node) {
  return {
    title: node?.title || "",
    description: node?.description || "",
    summary: node?.summary || "",
    type: node?.type || "capability",
    category: node?.category || "support",
    priority: node?.priority || "Medium",
    sectionRef: node?.sectionRef || "",
    actors: listToText(node?.actors),
    features: listToText(node?.features),
    useCases: listToText(node?.useCases),
    entities: listToText(node?.entities),
    integrations: listToText(node?.integrations),
    businessRules: listToText(node?.businessRules),
    diagramIds: listToText(node?.diagramIds),
  };
}

function formToNodePatch(form) {
  const patch = {
    title: form.title.trim() || "Untitled section",
    description: form.description.trim(),
    summary: form.summary.trim() || form.description.trim(),
    type: form.type.trim() || "capability",
    category: form.category.trim() || "support",
    priority: form.priority.trim() || "Medium",
    sectionRef: form.sectionRef.trim(),
  };

  for (const field of editableListFields) {
    patch[field] = textToList(form[field]);
  }

  return patch;
}

function createBlankChild(parent) {
  const title = "New spec section";
  return {
    id: createIdFromTitle(title),
    title,
    description: "Describe this section's purpose.",
    summary: "Describe this section's purpose.",
    type: "capability",
    category: parent?.category || "support",
    priority: parent?.priority || "Medium",
    sectionRef: parent?.sectionRef || "Custom section",
    actors: parent?.actors || [],
    features: ["Add the key responsibilities here."],
    useCases: [],
    entities: [],
    integrations: [],
    businessRules: [],
    diagramIds: parent?.diagramIds || [],
    children: [],
  };
}

function updateNodeById(node, id, updater) {
  if (node.id === id) return updater(node);
  return {
    ...node,
    children: (node.children || []).map((child) => updateNodeById(child, id, updater)),
  };
}

function deleteNodeById(node, id) {
  return {
    ...node,
    children: (node.children || [])
      .filter((child) => child.id !== id)
      .map((child) => deleteNodeById(child, id)),
  };
}

function findParentId(node, id, parentId = null) {
  if (node.id === id) return parentId;
  for (const child of node.children || []) {
    const found = findParentId(child, id, node.id);
    if (found) return found;
  }
  return null;
}

function flattenIds(node) {
  const ids = [node.id];
  for (const child of node.children || []) {
    ids.push(...flattenIds(child));
  }
  return ids;
}

function countDescendants(node) {
  if (!node.children || node.children.length === 0) return 0;
  let count = node.children.length;
  for (const child of node.children) {
    count += countDescendants(child);
  }
  return count;
}

function findNodeById(node, id) {
  if (node.id === id) return node;
  for (const child of node.children || []) {
    const found = findNodeById(child, id);
    if (found) return found;
  }
  return null;
}

function findNodePath(node, id, path = []) {
  const nextPath = [...path, node.title];
  if (node.id === id) return nextPath;

  for (const child of node.children || []) {
    const found = findNodePath(child, id, nextPath);
    if (found) return found;
  }

  return null;
}

function getNodeSearchText(node) {
  return [
    node.title,
    node.description,
    node.summary,
    node.type,
    node.category,
    node.sectionRef,
    node.priority,
    ...(node.actors || []),
    ...(node.features || []),
    ...(node.useCases || []),
    ...(node.entities || []),
    ...(node.integrations || []),
    ...(node.businessRules || []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function getSearchResult(root, query) {
  const q = query.trim().toLowerCase();

  if (!q) {
    return {
      filteredTree: root,
      exactMatchIds: new Set(),
      visibleIds: new Set(flattenIds(root)),
      ancestorIds: new Set(),
      firstMatchId: null,
      matchCount: 0,
    };
  }

  const exactMatchIds = new Set();
  const visibleIds = new Set();
  const ancestorIds = new Set();
  let firstMatchId = null;

  function walk(node, ancestors = []) {
    const selfMatches = getNodeSearchText(node).includes(q);
    const filteredChildren = [];

    for (const child of node.children || []) {
      const filteredChild = walk(child, [...ancestors, node.id]);
      if (filteredChild) filteredChildren.push(filteredChild);
    }

    if (selfMatches) {
      exactMatchIds.add(node.id);
      if (!firstMatchId) firstMatchId = node.id;
    }

    if (selfMatches || filteredChildren.length) {
      visibleIds.add(node.id);
      for (const ancestorId of ancestors) {
        visibleIds.add(ancestorId);
        ancestorIds.add(ancestorId);
      }
      return {
        ...node,
        children: filteredChildren,
      };
    }

    return null;
  }

  return {
    filteredTree: walk(root),
    exactMatchIds,
    visibleIds,
    ancestorIds,
    firstMatchId,
    matchCount: exactMatchIds.size,
  };
}

function getMatchingNodeIds(node, query) {
  return getSearchResult(node, query).visibleIds;
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function collectUniqueValues(node, field, values = new Set()) {
  for (const item of node[field] || []) {
    values.add(item);
  }
  for (const child of node.children || []) {
    collectUniqueValues(child, field, values);
  }
  return values;
}

function getSpecStats(root) {
  const narrativeSections = new Set(["why-it-stands-out", "implementation-roadmap", "final-word"]);
  return {
    coreModules: (root.children || []).filter((child) => !narrativeSections.has(child.id)).length,
    actors: collectUniqueValues(root, "actors").size,
    useCases: collectUniqueValues(root, "useCases").size,
    diagramSets: diagramCatalog.length,
  };
}

function getVisibleDiagramsForNode(type, node, showAll = false) {
  const tabDiagrams = diagramCatalog.filter((diagram) => diagram.type === type);
  if (showAll) return tabDiagrams;
  const relatedIds = new Set(node?.diagramIds || []);
  const relatedDiagrams = tabDiagrams.filter((diagram) => relatedIds.has(diagram.id));
  return relatedIds.size ? relatedDiagrams : tabDiagrams;
}

function getDiagramTags(diagram) {
  return diagram.tags?.length ? diagram.tags : [diagram.type];
}

function getCategoryLabel(category) {
  switch (category) {
    case "core":
      return "Core Module";
    case "support":
      return "Support Layer";
    case "integration":
      return "Integration";
    case "extension":
      return "Extension";
    case "governance":
      return "Governance";
    case "analysis":
      return "Analysis";
    default:
      return "Spec Item";
  }
}

function getTypeColor(type) {
  switch (type) {
    case "core-feature":
    case "core":
      return "#22c55e";
    case "capability":
      return "#06b6d4";
    case "extension-feature":
    case "extension":
      return "#38bdf8";
    case "integration":
      return "#8b5cf6";
    case "governance":
    case "rule":
      return "#fb7185";
    case "reporting":
    case "analysis":
      return "#60a5fa";
    case "entitlement":
      return "#34d399";
    case "value":
      return "#f59e0b";
    case "phase":
      return "#a855f7";
    case "membership":
      return "#ec4899";
    case "revenue":
      return "#14b8a6";
    case "metric":
      return "#3b82f6";
    case "use-case":
      return "#f97316";
    case "positioning":
      return "#eab308";
    case "summary":
      return "#94a3b8";
    default:
      return "#64748b";
  }
}

function Toolbar({
  search,
  setSearch,
  onExpandAll,
  onCollapseAll,
  onExpandTopLevel,
  totalNodes,
}) {
  const clearSearch = () => setSearch("");

  return (
    <div style={styles.toolbar}>
      <div style={styles.toolbarLeft}>
        <div style={styles.titleBlock}>
          <div style={styles.eyebrow}>Interactive sitemap</div>
          <div style={styles.appTitle}>Dekonstrukt Spec Map</div>
          <div style={styles.appSubTitle}>
            Explore the unified music-label platform brief, inspect product details, and jump into related diagrams.
          </div>
        </div>
      </div>

      <div className="toolbar-actions" style={styles.toolbarRight}>
        <div style={styles.searchWrap}>
          <input
            aria-label="Search sitemap"
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") clearSearch();
            }}
            placeholder="Search topics, values, capabilities..."
            style={styles.search}
          />
          {search && (
            <button
              type="button"
              className="glass-button"
              style={styles.clearButton}
              onClick={clearSearch}
              aria-label="Clear search"
            >
              Clear
            </button>
          )}
        </div>
        <button type="button" className="glass-button" style={styles.button} onClick={onExpandAll}>
          Expand All
        </button>
        <button type="button" className="glass-button" style={styles.button} onClick={onCollapseAll}>
          Collapse All
        </button>
        <button type="button" className="glass-button" style={styles.button} onClick={onExpandTopLevel}>
          Top Level
        </button>
        <div style={styles.counter}>Unified spec</div>
      </div>
    </div>
  );
}

function OverviewStrip({ matchedCount, search, selectedNode, stats }) {
  const cards = [
    {
      label: search.trim() ? "Search matches" : "Platform modules",
      value: search.trim() ? matchedCount : stats.coreModules,
      accent: "#2dd4bf",
    },
    {
      label: "Actors",
      value: stats.actors,
      accent: "#f472b6",
    },
    {
      label: "Use cases",
      value: stats.useCases,
      accent: "#facc15",
    },
    {
      label: "Diagram sets",
      value: stats.diagramSets,
      accent: getTypeColor(selectedNode?.type),
    },
  ];

  return (
    <div className="overview-strip" style={styles.overviewStrip}>
      {cards.map((card) => (
        <div key={card.label} style={styles.overviewCard}>
          <div style={{ ...styles.cardAccent, background: card.accent }} />
          <div style={styles.overviewLabel}>{card.label}</div>
          <div style={card.compact ? styles.overviewValueCompact : styles.overviewValue}>
            {card.value}
          </div>
        </div>
      ))}
    </div>
  );
}

function getChipColor(label) {
  const lower = String(label).toLowerCase();
  if (lower.includes("admin")) return "#facc15";
  if (lower.includes("moderator")) return "#fb7185";
  if (lower.includes("artist")) return "#22c55e";
  if (lower.includes("user")) return "#38bdf8";
  if (lower.includes("stripe") || lower.includes("payhere")) return "#34d399";
  if (lower.includes("discord")) return "#8b5cf6";
  if (lower.includes("system")) return "#94a3b8";
  return "#2dd4bf";
}

function SpecSection({ icon, title, children, visible = true }) {
  if (!visible) return null;
  return (
    <section style={styles.specSection}>
      <div style={styles.specSectionHeader}>
        <span style={styles.specSectionIcon}>{icon}</span>
        <span>{title}</span>
      </div>
      {children}
    </section>
  );
}

function ChipGroup({ items, variant = "default" }) {
  if (!items?.length) return null;
  return (
    <div style={styles.chipWrap}>
      {items.map((item) => {
        const color = getChipColor(item);
        return (
          <span
            key={`${variant}-${item}`}
            style={{
              ...styles.specChip,
              color,
              borderColor: `${color}70`,
              background: `${color}16`,
            }}
          >
            {item}
          </span>
        );
      })}
    </div>
  );
}

function BulletList({ items }) {
  if (!items?.length) return null;
  return (
    <ul style={styles.specList}>
      {items.map((item) => (
        <li key={item} style={styles.specListItem}>
          <span style={styles.specBullet} aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function HighlightText({ text, query }) {
  const value = String(text || "");
  const q = query.trim();
  if (!q) return value;

  const parts = value.split(new RegExp(`(${escapeRegExp(q)})`, "ig"));
  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === q.toLowerCase() ? (
          <mark key={`${part}-${index}`} style={styles.searchHighlight}>
            {part}
          </mark>
        ) : (
          <React.Fragment key={`${part}-${index}`}>{part}</React.Fragment>
        ),
      )}
    </>
  );
}

function NodeEditor({
  form,
  mode,
  onChange,
  onSave,
  onCancel,
}) {
  const updateField = (field, value) => {
    onChange({ ...form, [field]: value });
  };

  const listFields = [
    ["actors", "Actors & permissions"],
    ["features", "Core responsibilities"],
    ["useCases", "Use cases"],
    ["entities", "Entities"],
    ["integrations", "Integrations"],
    ["businessRules", "Rules / risks"],
    ["diagramIds", "Related diagram IDs"],
  ];

  return (
    <div style={styles.editorPanel}>
      <div style={styles.editorHeader}>
        <div>
          <div style={styles.editorKicker}>{mode === "create" ? "Create" : "Edit"} content</div>
          <div style={styles.editorTitle}>Update tree and spec details</div>
        </div>
        <div style={styles.editorActions}>
          <button type="button" className="glass-button" style={styles.iconTextButton} onClick={onSave}>
            <SaveRounded style={styles.actionIcon} />
            Save
          </button>
          <button type="button" className="glass-button" style={styles.iconTextButtonMuted} onClick={onCancel}>
            <CloseRounded style={styles.actionIcon} />
            Cancel
          </button>
        </div>
      </div>

      <div style={styles.editorGrid}>
        <label style={styles.fieldLabel}>
          Title
          <input
            value={form.title}
            onChange={(event) => updateField("title", event.target.value)}
            style={styles.editorInput}
          />
        </label>
        <label style={styles.fieldLabel}>
          Type
          <input
            value={form.type}
            onChange={(event) => updateField("type", event.target.value)}
            style={styles.editorInput}
          />
        </label>
        <label style={styles.fieldLabel}>
          Category
          <select
            value={form.category}
            onChange={(event) => updateField("category", event.target.value)}
            style={styles.editorInput}
          >
            {["core", "support", "extension", "integration", "governance", "analysis"].map((value) => (
              <option key={value} value={value}>{value}</option>
            ))}
          </select>
        </label>
        <label style={styles.fieldLabel}>
          Priority
          <input
            value={form.priority}
            onChange={(event) => updateField("priority", event.target.value)}
            style={styles.editorInput}
          />
        </label>
      </div>

      <label style={styles.fieldLabel}>
        Source section
        <input
          value={form.sectionRef}
          onChange={(event) => updateField("sectionRef", event.target.value)}
          style={styles.editorInput}
        />
      </label>
      <label style={styles.fieldLabel}>
        Left panel description
        <textarea
          value={form.description}
          onChange={(event) => updateField("description", event.target.value)}
          rows={3}
          style={styles.editorTextarea}
        />
      </label>
      <label style={styles.fieldLabel}>
        Right panel summary
        <textarea
          value={form.summary}
          onChange={(event) => updateField("summary", event.target.value)}
          rows={3}
          style={styles.editorTextarea}
        />
      </label>

      <div style={styles.editorGrid}>
        {listFields.map(([field, label]) => (
          <label key={field} style={styles.fieldLabel}>
            {label}
            <textarea
              value={form[field]}
              onChange={(event) => updateField(field, event.target.value)}
              rows={field === "features" || field === "businessRules" ? 5 : 3}
              placeholder="One item per line"
              style={styles.editorTextarea}
            />
          </label>
        ))}
      </div>
    </div>
  );
}

function InfoPanel({
  node,
  editorMode,
  editForm,
  onFormChange,
  onSaveEdit,
  onCancelEdit,
  onStartEdit,
  onCreateChild,
  onDeleteNode,
  onResetContent,
  onSelectDiagram,
}) {
  if (!node) return null;

  const relatedDiagrams = diagramCatalog.filter((diagram) => node.diagramIds?.includes(diagram.id));
  const categoryColor = getTypeColor(node.category || node.type);
  const atAGlance = [
    ["Lens", getCategoryLabel(node.category)],
    ["Priority", node.priority || "Medium"],
    ["Source", node.sectionRef || "Project brief"],
    ["Node type", node.type || "node"],
  ];

  return (
    <div className="panel-float" style={styles.infoPanel}>
      <div style={styles.infoTopRow}>
        <span
          style={{
            ...styles.typeBadge,
            borderColor: categoryColor,
            color: categoryColor,
            background: `${categoryColor}18`,
          }}
        >
          {getCategoryLabel(node.category)}
        </span>
        <div style={styles.infoActions}>
          <button type="button" className="glass-button" style={styles.iconOnlyButton} onClick={onCreateChild} title="Add child section" aria-label="Add child section">
            <AddCircleOutlineRounded style={styles.actionIcon} />
          </button>
          <button type="button" className="glass-button" style={styles.iconOnlyButton} onClick={onStartEdit} title="Edit selected section" aria-label="Edit selected section">
            <EditRounded style={styles.actionIcon} />
          </button>
          <button
            type="button"
            className="glass-button"
            style={{ ...styles.iconOnlyButton, ...(node.id === "root" ? styles.disabledButton : {}) }}
            onClick={onDeleteNode}
            disabled={node.id === "root"}
            title="Delete selected section"
            aria-label="Delete selected section"
          >
            <DeleteOutlineRounded style={styles.actionIcon} />
          </button>
          <button type="button" className="glass-button" style={styles.iconOnlyButton} onClick={onResetContent} title="Reset saved edits" aria-label="Reset saved edits">
            <RestartAltRounded style={styles.actionIcon} />
          </button>
        </div>
      </div>

      <h2 style={styles.infoTitle}>{node.title}</h2>
      <p style={styles.infoDescription}>{node.summary || node.description}</p>

      {editorMode !== "view" && (
        <NodeEditor
          form={editForm}
          mode={editorMode}
          onChange={onFormChange}
          onSave={onSaveEdit}
          onCancel={onCancelEdit}
        />
      )}

      <SpecSection icon={<InsightsRounded style={styles.miniIcon} />} title="At a Glance">
        <div style={styles.glanceGrid}>
          {atAGlance.map(([label, value]) => (
            <div key={label} style={styles.glanceCard}>
              <div style={styles.statLabel}>{label}</div>
              <div style={styles.glanceValue}>{value}</div>
            </div>
          ))}
        </div>
      </SpecSection>

      <SpecSection
        icon={<GroupsRounded style={styles.miniIcon} />}
        title="Actors & Permissions"
        visible={Boolean(node.actors?.length)}
      >
        <ChipGroup items={node.actors} variant="actors" />
      </SpecSection>

      <SpecSection
        icon={<AssignmentTurnedInRounded style={styles.miniIcon} />}
        title="Core Responsibilities"
        visible={Boolean(node.features?.length)}
      >
        <BulletList items={node.features} />
      </SpecSection>

      <SpecSection
        icon={<AccountTreeRounded style={styles.miniIcon} />}
        title="Use Cases"
        visible={Boolean(node.useCases?.length)}
      >
        <BulletList items={node.useCases} />
      </SpecSection>

      <SpecSection
        icon={<DataObjectRounded style={styles.miniIcon} />}
        title="Data & Integrations"
        visible={Boolean(node.entities?.length || node.integrations?.length)}
      >
        {Boolean(node.entities?.length) && (
          <>
            <div style={styles.inlineLabel}>Entities</div>
            <ChipGroup items={node.entities} variant="entities" />
          </>
        )}
        {Boolean(node.integrations?.length) && (
          <>
            <div style={styles.inlineLabel}>Services</div>
            <ChipGroup items={node.integrations} variant="integrations" />
          </>
        )}
      </SpecSection>

      <SpecSection
        icon={<RuleRounded style={styles.miniIcon} />}
        title="Rules / Risks"
        visible={Boolean(node.businessRules?.length)}
      >
        <BulletList items={node.businessRules} />
      </SpecSection>

      <SpecSection
        icon={<SchemaRounded style={styles.miniIcon} />}
        title="Related Diagrams"
        visible={Boolean(relatedDiagrams.length)}
      >
        <div style={styles.diagramButtonGrid}>
          {relatedDiagrams.map((diagram) => (
            <button
              type="button"
              key={diagram.id}
              className="glass-button"
              style={styles.diagramButton}
              onClick={() => onSelectDiagram(diagram.id)}
            >
              <SchemaRounded style={styles.diagramButtonIcon} />
              <span>{diagram.title}</span>
            </button>
          ))}
        </div>
      </SpecSection>
    </div>
  );
}

function MermaidDiagram({ chart }) {
  const renderId = useRef(`mermaid-${Math.random().toString(36).slice(2)}`);
  const [svg, setSvg] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    mermaid.initialize({
      startOnLoad: false,
      securityLevel: "loose",
      theme: "dark",
      themeVariables: {
        background: "transparent",
        primaryColor: "#0f172a",
        primaryTextColor: "#e2e8f0",
        primaryBorderColor: "#38bdf8",
        lineColor: "#94a3b8",
        secondaryColor: "#111827",
        tertiaryColor: "#172033",
        actorBkg: "#0f172a",
        actorBorder: "#38bdf8",
        actorTextColor: "#e2e8f0",
        noteBkgColor: "#1e293b",
        noteTextColor: "#e2e8f0",
      },
    });

    setError("");
    mermaid
      .render(renderId.current, chart)
      .then(({ svg: renderedSvg }) => {
        if (isMounted) setSvg(renderedSvg);
      })
      .catch((renderError) => {
        if (isMounted) {
          setError(renderError?.message || "Diagram could not be rendered.");
          setSvg("");
        }
      });

    return () => {
      isMounted = false;
    };
  }, [chart]);

  if (error) {
    return <pre style={styles.diagramError}>{error}</pre>;
  }

  return (
    <div
      className="mermaid-render"
      style={styles.mermaidRender}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

function DiagramWorkspace({
  selectedNode,
  activeType,
  activeDiagramId,
  showAllDiagrams,
  onToggleShowAll,
  onTypeChange,
  onSelectDiagram,
}) {
  const [copiedId, setCopiedId] = useState(null);
  const visibleDiagrams = getVisibleDiagramsForNode(activeType, selectedNode, showAllDiagrams);
  const activeDiagram =
    visibleDiagrams.find((diagram) => diagram.id === activeDiagramId) || visibleDiagrams[0];
  const relatedIds = new Set(selectedNode?.diagramIds || []);

  const copyMermaid = async () => {
    if (!activeDiagram) return;
    try {
      await navigator.clipboard.writeText(activeDiagram.chart);
      setCopiedId(activeDiagram.id);
      window.setTimeout(() => setCopiedId(null), 1400);
    } catch {
      setCopiedId(null);
    }
  };

  return (
    <section id="diagram-workspace" style={styles.diagramWorkspace}>
      <div style={styles.diagramHeader}>
        <div>
          <div style={styles.eyebrow}>Diagram workspace</div>
          <h2 style={styles.diagramTitle}>Specification diagrams</h2>
          <p style={styles.diagramSubtitle}>
            The diagrams below are generated from structured spec data and update around the selected branch.
          </p>
        </div>
        <span style={styles.diagramContextBadge}>
          {selectedNode?.title || "Dekonstrukt"}
        </span>
      </div>

      <div style={styles.diagramToolbar}>
        <label style={styles.toggleLabel}>
          <input
            type="checkbox"
            checked={showAllDiagrams}
            onChange={(event) => onToggleShowAll(event.target.checked)}
            style={styles.toggleInput}
          />
          Show all diagrams
        </label>
        <button
          type="button"
          className="glass-button"
          style={styles.copyButton}
          onClick={copyMermaid}
          disabled={!activeDiagram}
        >
          {copiedId === activeDiagram?.id ? "Copied" : "Copy Mermaid"}
        </button>
      </div>

      <div style={styles.diagramTabs} role="tablist" aria-label="Diagram types">
        {diagramTabs.map((tab) => {
          const isActive = tab.type === activeType;
          const count = getVisibleDiagramsForNode(tab.type, selectedNode, showAllDiagrams).length;
          return (
            <button
              type="button"
              key={tab.type}
              role="tab"
              aria-selected={isActive}
              className="glass-button"
              style={{
                ...styles.diagramTab,
                ...(isActive ? styles.diagramTabActive : {}),
              }}
              onClick={() => onTypeChange(tab.type)}
            >
              {tab.label}
              <span style={styles.tabCount}>{count}</span>
            </button>
          );
        })}
      </div>

      <div className="diagram-grid">
        <div style={styles.diagramList}>
          {visibleDiagrams.length ? (
            visibleDiagrams.map((diagram) => {
              const isActive = diagram.id === activeDiagram?.id;
              const isRelated = relatedIds.has(diagram.id);
              return (
                <button
                  type="button"
                  key={diagram.id}
                  className="glass-button"
                  style={{
                    ...styles.diagramListItem,
                    ...(isActive ? styles.diagramListItemActive : {}),
                  }}
                  onClick={() => onSelectDiagram(diagram.id, false)}
                >
                  <span style={styles.diagramListTitle}>{diagram.title}</span>
                  <span style={styles.diagramTagRow}>
                    {getDiagramTags(diagram).map((tag) => (
                      <span key={`${diagram.id}-${tag}`} style={styles.diagramTag}>
                        {tag}
                      </span>
                    ))}
                  </span>
                  <span style={styles.diagramListMeta}>
                    {isRelated ? "Related" : "Reference"}
                  </span>
                </button>
              );
            })
          ) : (
            <div style={styles.emptyDiagramState}>
              No {diagramTabs.find((tab) => tab.type === activeType)?.label.toLowerCase()} diagrams are mapped to this branch yet.
            </div>
          )}
        </div>

        <div style={styles.diagramPreview}>
          {activeDiagram ? (
            <>
              <div style={styles.diagramPreviewHeader}>
                <div>
                  <h3 style={styles.diagramPreviewTitle}>{activeDiagram.title}</h3>
                  <p style={styles.diagramPreviewSummary}>{activeDiagram.summary}</p>
                  <div style={styles.diagramTagRow}>
                    {getDiagramTags(activeDiagram).map((tag) => (
                      <span key={`${activeDiagram.id}-${tag}`} style={styles.diagramTag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <span style={styles.typeBadge}>{activeDiagram.type}</span>
              </div>
              <MermaidDiagram chart={activeDiagram.chart} />
            </>
          ) : (
            <div style={styles.emptyDiagramState}>Select another tab to inspect available diagrams.</div>
          )}
        </div>
      </div>
    </section>
  );
}

function PanelSizeControl({ rightPanelWidth, onChange }) {
  const leftPanelWidth = 100 - rightPanelWidth;
  return (
    <div style={styles.panelControl}>
      <div>
        <div style={styles.panelControlTitle}>Panel size</div>
        <div style={styles.panelControlMeta}>
          Tree {leftPanelWidth}% / Spec reader {rightPanelWidth}%
        </div>
      </div>
      <input
        aria-label="Adjust right panel width"
        type="range"
        min="35"
        max="68"
        value={rightPanelWidth}
        onChange={(event) => onChange(Number(event.target.value))}
        style={styles.panelSlider}
      />
      <button type="button" className="glass-button" style={styles.panelResetButton} onClick={() => onChange(48)}>
        Reset
      </button>
    </div>
  );
}

function TreeNode({
  node,
  depth,
  expandedIds,
  selectedId,
  onToggle,
  onSelect,
  onCreateChild,
  onStartEdit,
  onDeleteNode,
  searchQuery,
  matchedIds,
}) {
  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = expandedIds.has(node.id);
  const isSelected = selectedId === node.id;
  const isMatched = matchedIds.has(node.id);
  const nodeColor = getTypeColor(node.type);

  return (
    <div className="tree-node" style={{ marginLeft: depth === 0 ? 0 : 22, position: "relative" }}>
      {depth > 0 && <div style={styles.verticalLine} />}

      <div style={styles.nodeRow}>
        {hasChildren ? (
          <button
            type="button"
            className="toggle-button"
            onClick={() => onToggle(node.id)}
            aria-expanded={isExpanded}
            aria-label={`${isExpanded ? "Collapse" : "Expand"} ${node.title}`}
            style={{
              ...styles.toggleButton,
              borderColor: isSelected ? nodeColor : "rgba(148, 163, 184, 0.35)",
              color: isSelected ? nodeColor : "#cbd5e1",
            }}
            title={isExpanded ? "Collapse branch" : "Expand branch"}
          >
            <span style={styles.toggleGlyph}>{isExpanded ? "-" : "+"}</span>
            {isExpanded ? "−" : "+"}
          </button>
        ) : (
          <div style={{ ...styles.leafDot, borderColor: `${nodeColor}66` }} />
        )}

        <div
          role="button"
          tabIndex={0}
          className="node-card"
          onClick={() => onSelect(node.id)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              onSelect(node.id);
            }
          }}
          style={{
            ...styles.nodeCard,
            borderColor: isSelected
              ? nodeColor
              : isMatched
              ? "#22c55e"
              : "rgba(148, 163, 184, 0.18)",
            boxShadow: isSelected
              ? `0 0 0 1px ${nodeColor}55, 0 18px 42px rgba(0,0,0,0.36)`
              : isMatched
              ? "0 14px 34px rgba(34,197,94,0.13), 0 10px 26px rgba(0,0,0,0.22)"
              : "0 10px 26px rgba(0,0,0,0.24)",
            background: isSelected
              ? `linear-gradient(135deg, ${nodeColor}24, rgba(15,23,42,0.82))`
              : "linear-gradient(135deg, rgba(15,23,42,0.72), rgba(2,6,23,0.54))",
          }}
        >
          <div style={styles.nodeHeader}>
            <div style={styles.nodeTitleWrap}>
              <div style={styles.nodeTitle}>
                <HighlightText text={node.title} query={searchQuery} />
              </div>
              <span
                style={{
                  ...styles.inlineTypeBadge,
                  color: nodeColor,
                  borderColor: `${nodeColor}88`,
                  background: `${nodeColor}14`,
                }}
              >
                {node.type || "node"}
              </span>
            </div>

            {hasChildren && (
              <div style={styles.childCount}>
                {node.children.length} child{node.children.length !== 1 ? "ren" : ""}
              </div>
            )}
          </div>

          {isSelected && (
            <>
              <div style={styles.nodeDescription}>
                <HighlightText text={node.description} query={searchQuery} />
              </div>
              <div style={styles.nodeCrudRow}>
                <button
                  type="button"
                  className="glass-button"
                  style={styles.nodeCrudButton}
                  onClick={(event) => {
                    event.stopPropagation();
                    onCreateChild(node.id);
                  }}
                >
                  <AddCircleOutlineRounded style={styles.nodeCrudIcon} />
                  Child
                </button>
                <button
                  type="button"
                  className="glass-button"
                  style={styles.nodeCrudButton}
                  onClick={(event) => {
                    event.stopPropagation();
                    onStartEdit(node.id);
                  }}
                >
                  <EditRounded style={styles.nodeCrudIcon} />
                  Edit
                </button>
                <button
                  type="button"
                  className="glass-button"
                  disabled={node.id === "root"}
                  style={{ ...styles.nodeCrudButton, ...(node.id === "root" ? styles.disabledButton : {}) }}
                  onClick={(event) => {
                    event.stopPropagation();
                    onDeleteNode(node.id);
                  }}
                >
                  <DeleteOutlineRounded style={styles.nodeCrudIcon} />
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {hasChildren && isExpanded && (
        <div className="children-wrap" style={styles.childrenWrap}>
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              depth={depth + 1}
              expandedIds={expandedIds}
              selectedId={selectedId}
              onToggle={onToggle}
              onSelect={onSelect}
              onCreateChild={onCreateChild}
              onStartEdit={onStartEdit}
              onDeleteNode={onDeleteNode}
              searchQuery={searchQuery}
              matchedIds={matchedIds}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [mapData, setMapData] = useState(loadStoredMap);
  const [selectedId, setSelectedId] = useState("root");
  const [expandedIds, setExpandedIds] = useState(new Set(["root"]));
  const [search, setSearch] = useState("");
  const [activeDiagramType, setActiveDiagramType] = useState("use-case");
  const [activeDiagramId, setActiveDiagramId] = useState("overall-use-case");
  const [showAllDiagrams, setShowAllDiagrams] = useState(false);
  const [rightPanelWidth, setRightPanelWidth] = useState(loadStoredPanelWidth);
  const [editorMode, setEditorMode] = useState("view");
  const [editForm, setEditForm] = useState(() => nodeToForm(specMindMapData));
  const searchSessionRef = useRef(null);

  const allIds = useMemo(() => flattenIds(mapData), [mapData]);
  const totalNodes = allIds.length;
  const stats = useMemo(() => getSpecStats(mapData), [mapData]);

  const searchResult = useMemo(() => getSearchResult(mapData, search), [mapData, search]);
  const isSearching = Boolean(search.trim());
  const treeToRender = isSearching ? searchResult.filteredTree : mapData;
  const matchedIds = searchResult.exactMatchIds;

  useEffect(() => {
    window.localStorage.setItem(MAP_STORAGE_KEY, JSON.stringify(mapData));
  }, [mapData]);

  useEffect(() => {
    window.localStorage.setItem(PANEL_STORAGE_KEY, String(rightPanelWidth));
  }, [rightPanelWidth]);

  useEffect(() => {
    if (isSearching) {
      if (!searchSessionRef.current) {
        searchSessionRef.current = {
          selectedId,
          expandedIds: new Set(expandedIds),
        };
      }

      if (searchResult.firstMatchId) {
        setSelectedId(searchResult.firstMatchId);
      }

      setExpandedIds(new Set([...searchResult.visibleIds, "root"]));
      return;
    }

    if (searchSessionRef.current) {
      const previous = searchSessionRef.current;
      searchSessionRef.current = null;
      const restoredSelectedId = findNodeById(mapData, previous.selectedId)
        ? previous.selectedId
        : "root";
      setSelectedId(restoredSelectedId);
      setExpandedIds(previous.expandedIds);
    }
  }, [isSearching, searchResult.firstMatchId, searchResult.visibleIds, mapData]);

  const selectedNode = useMemo(() => {
    return findNodeById(mapData, selectedId) || mapData;
  }, [mapData, selectedId]);

  useEffect(() => {
    const activeTypeDiagram = getVisibleDiagramsForNode(
      activeDiagramType,
      selectedNode,
      showAllDiagrams,
    )[0];
    if (activeTypeDiagram) {
      setActiveDiagramId(activeTypeDiagram.id);
      return;
    }

    const firstRelatedDiagram = diagramCatalog.find((diagram) =>
      selectedNode?.diagramIds?.includes(diagram.id),
    );
    if (firstRelatedDiagram) {
      setActiveDiagramType(firstRelatedDiagram.type);
      setActiveDiagramId(firstRelatedDiagram.id);
    }
  }, [selectedNode, activeDiagramType, showAllDiagrams]);

  useEffect(() => {
    if (editorMode === "view") {
      setEditForm(nodeToForm(selectedNode));
    }
  }, [editorMode, selectedNode]);

  const selectDiagram = (diagramId, shouldScroll = true) => {
    const diagram = diagramCatalog.find((item) => item.id === diagramId);
    if (!diagram) return;
    setActiveDiagramType(diagram.type);
    setActiveDiagramId(diagram.id);
    if (shouldScroll) {
      window.requestAnimationFrame(() => {
        document.getElementById("diagram-workspace")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    }
  };

  const changeDiagramType = (type) => {
    setActiveDiagramType(type);
    const nextDiagram = getVisibleDiagramsForNode(type, selectedNode, showAllDiagrams)[0];
    if (nextDiagram) setActiveDiagramId(nextDiagram.id);
  };

  const startEdit = (id = selectedId) => {
    const node = findNodeById(mapData, id);
    if (!node) return;
    setSelectedId(id);
    setEditForm(nodeToForm(node));
    setEditorMode("edit");
  };

  const createChild = (parentId = selectedId) => {
    const parent = findNodeById(mapData, parentId) || mapData;
    const child = createBlankChild(parent);
    setMapData((current) =>
      updateNodeById(current, parent.id, (node) => ({
        ...node,
        children: [...(node.children || []), child],
      })),
    );
    setExpandedIds((prev) => new Set([...prev, parent.id]));
    setSelectedId(child.id);
    setEditForm(nodeToForm(child));
    setEditorMode("create");
  };

  const saveEdit = () => {
    const patch = formToNodePatch(editForm);
    setMapData((current) =>
      updateNodeById(current, selectedId, (node) => ({
        ...node,
        ...patch,
        children: node.children || [],
      })),
    );
    setEditorMode("view");
  };

  const cancelEdit = () => {
    setEditForm(nodeToForm(selectedNode));
    setEditorMode("view");
  };

  const deleteNode = (id = selectedId) => {
    if (id === "root") return;
    const node = findNodeById(mapData, id);
    if (!node) return;
    const confirmed = window.confirm(`Delete "${node.title}" and all child sections?`);
    if (!confirmed) return;
    const parentId = findParentId(mapData, id) || "root";
    setMapData((current) => deleteNodeById(current, id));
    setSelectedId(parentId);
    setExpandedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
    setEditorMode("view");
  };

  const resetContent = () => {
    const confirmed = window.confirm("Reset all edited spec content and panel data back to the built-in version?");
    if (!confirmed) return;
    const fresh = cloneData(specMindMapData);
    window.localStorage.removeItem(MAP_STORAGE_KEY);
    setMapData(fresh);
    setSelectedId("root");
    setExpandedIds(new Set(["root"]));
    setEditorMode("view");
  };

  const toggleNode = (id) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const expandAll = () => {
    setExpandedIds(new Set(allIds));
  };

  const collapseAll = () => {
    setExpandedIds(new Set(["root"]));
  };

  const expandTopLevel = () => {
    const next = new Set(["root"]);
    for (const child of mapData.children || []) {
      next.add(child.id);
    }
    setExpandedIds(next);
  };

  return (
    <div style={styles.page}>
      <style>{globalCss}</style>
      <div className="ambient-field" aria-hidden="true" />
      <div className="app-content" style={styles.content}>
        <Toolbar
          search={search}
          setSearch={setSearch}
          onExpandAll={expandAll}
          onCollapseAll={collapseAll}
          onExpandTopLevel={expandTopLevel}
          totalNodes={totalNodes}
        />

        <OverviewStrip
          matchedCount={searchResult.matchCount}
          search={search}
          selectedNode={selectedNode}
          stats={stats}
        />

        <PanelSizeControl
          rightPanelWidth={rightPanelWidth}
          onChange={setRightPanelWidth}
        />

        <div
          className="responsive-layout"
          style={{
            ...styles.layout,
            gridTemplateColumns: `minmax(280px, ${100 - rightPanelWidth}fr) minmax(360px, ${rightPanelWidth}fr)`,
          }}
        >
          <div style={styles.treePanel}>
            {treeToRender ? (
              <TreeNode
                node={treeToRender}
                depth={0}
                expandedIds={expandedIds}
                selectedId={selectedId}
                onToggle={toggleNode}
                onSelect={setSelectedId}
                onCreateChild={createChild}
                onStartEdit={startEdit}
                onDeleteNode={deleteNode}
                searchQuery={search}
                matchedIds={matchedIds}
              />
            ) : (
              <div style={styles.emptyTreeState}>
                No matching nodes found for "{search.trim()}".
              </div>
            )}
          </div>

          <div className="sticky-panel" style={styles.sidePanel}>
            <InfoPanel
              node={selectedNode}
              editorMode={editorMode}
              editForm={editForm}
              onFormChange={setEditForm}
              onSaveEdit={saveEdit}
              onCancelEdit={cancelEdit}
              onStartEdit={() => startEdit(selectedId)}
              onCreateChild={() => createChild(selectedId)}
              onDeleteNode={() => deleteNode(selectedId)}
              onResetContent={resetContent}
              onSelectDiagram={selectDiagram}
            />
          </div>
        </div>

        <DiagramWorkspace
          selectedNode={selectedNode}
          activeType={activeDiagramType}
          activeDiagramId={activeDiagramId}
          showAllDiagrams={showAllDiagrams}
          onToggleShowAll={setShowAllDiagrams}
          onTypeChange={changeDiagramType}
          onSelectDiagram={selectDiagram}
        />
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    width: "100%",
    position: "relative",
    overflow: "hidden",
    background: "#050711",
    color: "#e2e8f0",
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },

  content: {
    width: "100%",
    minHeight: "100vh",
    padding: 24,
    position: "relative",
  },

  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    gap: 16,
    flexWrap: "wrap",
    marginBottom: 14,
    padding: 18,
    border: "1px solid rgba(255,255,255,0.16)",
    background:
      "linear-gradient(135deg, rgba(255,255,255,0.14), rgba(255,255,255,0.055))",
    borderRadius: 8,
    backdropFilter: "blur(22px) saturate(145%)",
    WebkitBackdropFilter: "blur(22px) saturate(145%)",
    boxShadow: "0 18px 48px rgba(0,0,0,0.34), inset 0 1px 0 rgba(255,255,255,0.12)",
  },

  toolbarLeft: {
    display: "flex",
    alignItems: "center",
    minWidth: 280,
    flex: 1,
  },

  titleBlock: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },

  eyebrow: {
    width: "fit-content",
    color: "#2dd4bf",
    border: "1px solid rgba(45, 212, 191, 0.36)",
    background: "rgba(45, 212, 191, 0.11)",
    borderRadius: 999,
    padding: "5px 9px",
    fontSize: 11,
    lineHeight: 1,
    fontWeight: 800,
    letterSpacing: 0,
    textTransform: "uppercase",
  },

  appTitle: {
    fontSize: 28,
    fontWeight: 800,
    color: "#f8fafc",
    letterSpacing: 0,
  },

  appSubTitle: {
    fontSize: 14,
    color: "#94a3b8",
    lineHeight: 1.5,
    maxWidth: 700,
  },

  toolbarRight: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    flexWrap: "wrap",
  },

  searchWrap: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    flex: "1 1 330px",
    minWidth: 260,
  },

  search: {
    width: 360,
    maxWidth: "100%",
    padding: "11px 14px",
    borderRadius: 8,
    border: "1px solid rgba(148, 163, 184, 0.24)",
    background: "rgba(2, 6, 23, 0.54)",
    color: "#e2e8f0",
    outline: "none",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
    flex: 1,
  },

  button: {
    padding: "11px 14px",
    borderRadius: 8,
    border: "1px solid rgba(255,255,255,0.16)",
    background: "rgba(15, 23, 42, 0.64)",
    color: "#e2e8f0",
    cursor: "pointer",
    fontWeight: 700,
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.09)",
  },

  clearButton: {
    padding: "11px 12px",
    borderRadius: 8,
    border: "1px solid rgba(244, 114, 182, 0.34)",
    background: "rgba(244, 114, 182, 0.1)",
    color: "#fbcfe8",
    cursor: "pointer",
    fontWeight: 800,
  },

  counter: {
    padding: "10px 12px",
    borderRadius: 8,
    border: "1px solid rgba(250, 204, 21, 0.28)",
    background: "rgba(250, 204, 21, 0.09)",
    color: "#fde68a",
    fontSize: 13,
    fontWeight: 800,
  },

  panelControl: {
    display: "grid",
    gridTemplateColumns: "minmax(180px, auto) minmax(220px, 1fr) auto",
    alignItems: "center",
    gap: 14,
    marginBottom: 14,
    padding: 14,
    border: "1px solid rgba(255,255,255,0.13)",
    borderRadius: 8,
    background: "linear-gradient(135deg, rgba(15,23,42,0.76), rgba(2,6,23,0.48))",
    boxShadow: "0 12px 30px rgba(0,0,0,0.24), inset 0 1px 0 rgba(255,255,255,0.08)",
  },

  panelControlTitle: {
    color: "#f8fafc",
    fontSize: 13,
    fontWeight: 850,
    marginBottom: 4,
  },

  panelControlMeta: {
    color: "#94a3b8",
    fontSize: 12,
    fontWeight: 700,
  },

  panelSlider: {
    width: "100%",
    accentColor: "#2dd4bf",
    cursor: "pointer",
  },

  panelResetButton: {
    minHeight: 36,
    padding: "8px 11px",
    borderRadius: 8,
    border: "1px solid rgba(125, 211, 252, 0.24)",
    background: "rgba(14, 165, 233, 0.1)",
    color: "#dbeafe",
    cursor: "pointer",
    fontWeight: 800,
  },

  overviewStrip: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(160px, 1fr))",
    gap: 14,
    marginBottom: 14,
  },

  overviewCard: {
    position: "relative",
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.14)",
    background: "linear-gradient(135deg, rgba(255,255,255,0.11), rgba(255,255,255,0.045))",
    borderRadius: 8,
    padding: 16,
    minHeight: 96,
    backdropFilter: "blur(18px) saturate(135%)",
    WebkitBackdropFilter: "blur(18px) saturate(135%)",
    boxShadow: "0 14px 36px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.09)",
  },

  cardAccent: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
  },

  overviewLabel: {
    fontSize: 12,
    color: "#a7b4c8",
    fontWeight: 700,
    marginBottom: 10,
  },

  overviewValue: {
    fontSize: 30,
    color: "#f8fafc",
    fontWeight: 850,
    lineHeight: 1,
  },

  overviewValueCompact: {
    fontSize: 18,
    color: "#f8fafc",
    fontWeight: 850,
    lineHeight: 1.25,
    textTransform: "capitalize",
  },

  layout: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1.6fr) minmax(320px, 0.8fr)",
    gap: 20,
    alignItems: "start",
  },

  treePanel: {
    border: "1px solid rgba(255,255,255,0.14)",
    background:
      "linear-gradient(145deg, rgba(255,255,255,0.115), rgba(10,16,30,0.62))",
    borderRadius: 8,
    padding: 20,
    minHeight: "calc(100vh - 225px)",
    overflow: "auto",
    backdropFilter: "blur(20px) saturate(140%)",
    WebkitBackdropFilter: "blur(20px) saturate(140%)",
    boxShadow: "0 20px 60px rgba(0,0,0,0.34), inset 0 1px 0 rgba(255,255,255,0.1)",
    scrollbarColor: "rgba(45, 212, 191, 0.45) transparent",
  },

  sidePanel: {
    position: "sticky",
    top: 24,
  },

  infoPanel: {
    border: "1px solid rgba(255,255,255,0.14)",
    background:
      "linear-gradient(145deg, rgba(255,255,255,0.13), rgba(10,16,30,0.68))",
    borderRadius: 8,
    padding: 20,
    backdropFilter: "blur(22px) saturate(145%)",
    WebkitBackdropFilter: "blur(22px) saturate(145%)",
    boxShadow: "0 20px 60px rgba(0,0,0,0.34), inset 0 1px 0 rgba(255,255,255,0.1)",
  },

  infoLabelRow: {
    display: "flex",
    marginBottom: 12,
  },

  infoTopRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },

  infoActions: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
    justifyContent: "flex-end",
  },

  iconOnlyButton: {
    width: 34,
    height: 34,
    minWidth: 34,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    border: "1px solid rgba(148, 163, 184, 0.22)",
    background: "rgba(15, 23, 42, 0.58)",
    color: "#dbeafe",
    cursor: "pointer",
  },

  disabledButton: {
    opacity: 0.45,
    cursor: "not-allowed",
  },

  actionIcon: {
    width: 17,
    height: 17,
  },

  typeBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "6px 10px",
    border: "1px solid",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 700,
    textTransform: "capitalize",
  },

  infoTitle: {
    fontSize: 26,
    lineHeight: 1.2,
    margin: "0 0 12px 0",
    color: "#f8fafc",
  },

  infoDescription: {
    fontSize: 15,
    lineHeight: 1.7,
    color: "#cbd5e1",
    margin: "0 0 18px 0",
  },

  editorPanel: {
    border: "1px solid rgba(45, 212, 191, 0.24)",
    borderRadius: 8,
    padding: 14,
    marginBottom: 14,
    background: "linear-gradient(145deg, rgba(45,212,191,0.11), rgba(15,23,42,0.58))",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
  },

  editorHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 14,
  },

  editorKicker: {
    color: "#99f6e4",
    fontSize: 11,
    fontWeight: 900,
    textTransform: "uppercase",
    marginBottom: 4,
  },

  editorTitle: {
    color: "#f8fafc",
    fontSize: 15,
    fontWeight: 850,
  },

  editorActions: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
    justifyContent: "flex-end",
  },

  iconTextButton: {
    minHeight: 34,
    display: "inline-flex",
    alignItems: "center",
    gap: 7,
    padding: "8px 11px",
    borderRadius: 8,
    border: "1px solid rgba(45, 212, 191, 0.34)",
    background: "rgba(45, 212, 191, 0.13)",
    color: "#ccfbf1",
    cursor: "pointer",
    fontWeight: 850,
  },

  iconTextButtonMuted: {
    minHeight: 34,
    display: "inline-flex",
    alignItems: "center",
    gap: 7,
    padding: "8px 11px",
    borderRadius: 8,
    border: "1px solid rgba(148, 163, 184, 0.22)",
    background: "rgba(15, 23, 42, 0.56)",
    color: "#cbd5e1",
    cursor: "pointer",
    fontWeight: 850,
  },

  editorGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: 12,
  },

  fieldLabel: {
    display: "grid",
    gap: 7,
    color: "#94a3b8",
    fontSize: 12,
    fontWeight: 850,
    marginBottom: 12,
  },

  editorInput: {
    width: "100%",
    minHeight: 38,
    borderRadius: 8,
    border: "1px solid rgba(148, 163, 184, 0.24)",
    background: "rgba(2, 6, 23, 0.56)",
    color: "#e2e8f0",
    padding: "9px 10px",
    outline: "none",
    font: "inherit",
  },

  editorTextarea: {
    width: "100%",
    minHeight: 86,
    resize: "vertical",
    borderRadius: 8,
    border: "1px solid rgba(148, 163, 184, 0.24)",
    background: "rgba(2, 6, 23, 0.56)",
    color: "#e2e8f0",
    padding: "10px",
    outline: "none",
    font: "inherit",
    lineHeight: 1.45,
  },

  specSection: {
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 8,
    padding: 14,
    marginBottom: 12,
    background: "rgba(2, 6, 23, 0.34)",
  },

  specSectionHeader: {
    display: "flex",
    alignItems: "center",
    gap: 9,
    color: "#f8fafc",
    fontSize: 13,
    fontWeight: 850,
    marginBottom: 12,
  },

  specSectionIcon: {
    width: 24,
    height: 24,
    minWidth: 24,
    borderRadius: 8,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#2dd4bf",
    background: "rgba(45, 212, 191, 0.12)",
    border: "1px solid rgba(45, 212, 191, 0.22)",
  },

  miniIcon: {
    width: 16,
    height: 16,
  },

  glanceGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: 10,
  },

  glanceCard: {
    minHeight: 70,
    border: "1px solid rgba(148, 163, 184, 0.14)",
    borderRadius: 8,
    padding: 11,
    background: "rgba(15, 23, 42, 0.48)",
  },

  glanceValue: {
    color: "#e2e8f0",
    fontSize: 13,
    lineHeight: 1.4,
    fontWeight: 800,
    overflowWrap: "anywhere",
  },

  chipWrap: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
  },

  specChip: {
    display: "inline-flex",
    alignItems: "center",
    minHeight: 28,
    padding: "6px 9px",
    border: "1px solid",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 760,
    lineHeight: 1.2,
    overflowWrap: "anywhere",
  },

  specList: {
    listStyle: "none",
    display: "grid",
    gap: 9,
    padding: 0,
    margin: 0,
  },

  specListItem: {
    position: "relative",
    display: "grid",
    gridTemplateColumns: "7px 1fr",
    gap: 9,
    alignItems: "start",
    paddingLeft: 16,
    color: "#cbd5e1",
    fontSize: 13,
    lineHeight: 1.55,
  },

  specBullet: {
    width: 7,
    height: 7,
    borderRadius: 999,
    marginTop: 7,
    background: "linear-gradient(135deg, #2dd4bf, #7dd3fc)",
    boxShadow: "0 0 0 3px rgba(45, 212, 191, 0.12)",
  },

  searchHighlight: {
    padding: "0 3px",
    borderRadius: 4,
    background: "rgba(250, 204, 21, 0.26)",
    color: "#fef9c3",
    boxShadow: "0 0 0 1px rgba(250, 204, 21, 0.2)",
  },

  inlineLabel: {
    color: "#94a3b8",
    fontSize: 12,
    fontWeight: 800,
    margin: "10px 0 8px",
  },

  diagramButtonGrid: {
    display: "grid",
    gap: 8,
  },

  diagramButton: {
    width: "100%",
    minHeight: 42,
    display: "grid",
    gridTemplateColumns: "20px 1fr",
    alignItems: "center",
    gap: 9,
    padding: "9px 11px",
    borderRadius: 8,
    border: "1px solid rgba(125, 211, 252, 0.24)",
    background: "rgba(14, 165, 233, 0.1)",
    color: "#dbeafe",
    cursor: "pointer",
    textAlign: "left",
    fontSize: 12,
    fontWeight: 800,
  },

  diagramButtonIcon: {
    width: 17,
    height: 17,
    color: "#7dd3fc",
  },

  diagramWorkspace: {
    marginTop: 20,
    border: "1px solid rgba(255,255,255,0.14)",
    background:
      "linear-gradient(145deg, rgba(255,255,255,0.11), rgba(10,16,30,0.68))",
    borderRadius: 8,
    padding: 20,
    backdropFilter: "blur(20px) saturate(140%)",
    WebkitBackdropFilter: "blur(20px) saturate(140%)",
    boxShadow: "0 20px 60px rgba(0,0,0,0.34), inset 0 1px 0 rgba(255,255,255,0.1)",
  },

  diagramHeader: {
    display: "flex",
    justifyContent: "space-between",
    gap: 16,
    flexWrap: "wrap",
    alignItems: "flex-start",
    marginBottom: 16,
  },

  diagramToolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    flexWrap: "wrap",
    marginBottom: 16,
    padding: 12,
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 8,
    background: "rgba(2, 6, 23, 0.28)",
  },

  toggleLabel: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    color: "#cbd5e1",
    fontSize: 13,
    fontWeight: 800,
    cursor: "pointer",
  },

  toggleInput: {
    width: 16,
    height: 16,
    accentColor: "#2dd4bf",
    cursor: "pointer",
  },

  copyButton: {
    minHeight: 36,
    padding: "8px 11px",
    borderRadius: 8,
    border: "1px solid rgba(45, 212, 191, 0.26)",
    background: "rgba(45, 212, 191, 0.1)",
    color: "#ccfbf1",
    cursor: "pointer",
    fontWeight: 850,
  },

  diagramTitle: {
    color: "#f8fafc",
    fontSize: 24,
    lineHeight: 1.2,
    margin: "8px 0 6px",
  },

  diagramSubtitle: {
    color: "#94a3b8",
    fontSize: 14,
    lineHeight: 1.55,
    maxWidth: 760,
    margin: 0,
  },

  diagramContextBadge: {
    border: "1px solid rgba(45, 212, 191, 0.28)",
    background: "rgba(45, 212, 191, 0.1)",
    color: "#99f6e4",
    borderRadius: 999,
    padding: "8px 11px",
    fontSize: 12,
    fontWeight: 850,
  },

  diagramTabs: {
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 16,
  },

  diagramTab: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    minHeight: 38,
    padding: "9px 12px",
    borderRadius: 8,
    border: "1px solid rgba(148, 163, 184, 0.22)",
    background: "rgba(15, 23, 42, 0.58)",
    color: "#cbd5e1",
    cursor: "pointer",
    fontWeight: 800,
  },

  diagramTabActive: {
    borderColor: "rgba(45, 212, 191, 0.62)",
    background: "rgba(45, 212, 191, 0.14)",
    color: "#f8fafc",
  },

  tabCount: {
    display: "inline-flex",
    minWidth: 22,
    height: 22,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    background: "rgba(255,255,255,0.11)",
    color: "#e2e8f0",
    fontSize: 11,
  },

  diagramList: {
    display: "grid",
    gap: 10,
    alignContent: "start",
  },

  diagramListItem: {
    width: "100%",
    minHeight: 74,
    display: "grid",
    gap: 8,
    padding: 13,
    borderRadius: 8,
    border: "1px solid rgba(148, 163, 184, 0.18)",
    background: "rgba(2, 6, 23, 0.38)",
    color: "#e2e8f0",
    cursor: "pointer",
    textAlign: "left",
  },

  diagramListItemActive: {
    borderColor: "rgba(45, 212, 191, 0.68)",
    background: "linear-gradient(135deg, rgba(45, 212, 191, 0.16), rgba(15, 23, 42, 0.72))",
    boxShadow: "0 14px 30px rgba(45, 212, 191, 0.1)",
  },

  diagramListTitle: {
    fontSize: 13,
    fontWeight: 850,
    lineHeight: 1.35,
  },

  diagramTagRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 8,
  },

  diagramTag: {
    display: "inline-flex",
    alignItems: "center",
    minHeight: 22,
    border: "1px solid rgba(45, 212, 191, 0.24)",
    borderRadius: 999,
    padding: "3px 7px",
    color: "#99f6e4",
    background: "rgba(45, 212, 191, 0.08)",
    fontSize: 10,
    fontWeight: 850,
    textTransform: "uppercase",
  },

  diagramListMeta: {
    width: "fit-content",
    border: "1px solid rgba(125, 211, 252, 0.24)",
    borderRadius: 999,
    padding: "4px 8px",
    color: "#bae6fd",
    background: "rgba(14, 165, 233, 0.1)",
    fontSize: 11,
    fontWeight: 800,
  },

  diagramPreview: {
    minHeight: 520,
    overflow: "auto",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 8,
    padding: 16,
    background: "rgba(2, 6, 23, 0.42)",
    scrollbarColor: "rgba(45, 212, 191, 0.45) transparent",
  },

  diagramPreviewHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 16,
    marginBottom: 14,
  },

  diagramPreviewTitle: {
    color: "#f8fafc",
    fontSize: 18,
    lineHeight: 1.25,
    margin: "0 0 6px",
  },

  diagramPreviewSummary: {
    color: "#94a3b8",
    fontSize: 13,
    lineHeight: 1.5,
    margin: 0,
  },

  mermaidRender: {
    minWidth: 720,
    padding: 12,
    borderRadius: 8,
    background: "rgba(15, 23, 42, 0.38)",
  },

  diagramError: {
    whiteSpace: "pre-wrap",
    color: "#fecaca",
    border: "1px solid rgba(248, 113, 113, 0.32)",
    borderRadius: 8,
    background: "rgba(127, 29, 29, 0.16)",
    padding: 14,
  },

  emptyDiagramState: {
    minHeight: 120,
    display: "grid",
    placeItems: "center",
    border: "1px dashed rgba(148, 163, 184, 0.24)",
    borderRadius: 8,
    padding: 16,
    color: "#94a3b8",
    fontSize: 13,
    lineHeight: 1.5,
    textAlign: "center",
    background: "rgba(2, 6, 23, 0.28)",
  },

  emptyTreeState: {
    minHeight: 260,
    display: "grid",
    placeItems: "center",
    border: "1px dashed rgba(148, 163, 184, 0.28)",
    borderRadius: 8,
    padding: 20,
    color: "#94a3b8",
    background: "rgba(2, 6, 23, 0.34)",
    fontSize: 14,
    fontWeight: 750,
    textAlign: "center",
  },

  pathCard: {
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 8,
    padding: 14,
    marginBottom: 12,
    background: "rgba(2, 6, 23, 0.36)",
  },

  pathText: {
    fontSize: 13,
    lineHeight: 1.5,
    color: "#dbeafe",
    fontWeight: 700,
  },

  infoStats: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12,
  },

  statCard: {
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 8,
    padding: 14,
    background: "rgba(2, 6, 23, 0.36)",
  },

  statLabel: {
    fontSize: 12,
    color: "#94a3b8",
    marginBottom: 8,
  },

  statValue: {
    fontSize: 24,
    fontWeight: 700,
    color: "#f8fafc",
  },

  insightCard: {
    display: "grid",
    gridTemplateColumns: "1fr auto",
    alignItems: "center",
    gap: 14,
    marginTop: 12,
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 8,
    padding: 14,
    background: "rgba(2, 6, 23, 0.36)",
  },

  depthBarTrack: {
    height: 8,
    borderRadius: 999,
    background: "rgba(148, 163, 184, 0.18)",
    overflow: "hidden",
  },

  depthBarFill: {
    height: "100%",
    borderRadius: 999,
    background: "linear-gradient(90deg, #2dd4bf, #f472b6, #facc15)",
  },

  depthValue: {
    fontSize: 26,
    fontWeight: 850,
    color: "#f8fafc",
  },

  nodeRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: 10,
    position: "relative",
    marginBottom: 12,
  },

  toggleButton: {
    width: 28,
    height: 28,
    minWidth: 28,
    borderRadius: 999,
    border: "1px solid rgba(148, 163, 184, 0.35)",
    background: "rgba(2, 6, 23, 0.62)",
    cursor: "pointer",
    fontSize: 0,
    lineHeight: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 9,
    color: "#cbd5e1",
  },

  toggleGlyph: {
    fontSize: 18,
    lineHeight: 1,
    fontWeight: 900,
  },

  leafDot: {
    width: 28,
    height: 28,
    minWidth: 28,
    borderRadius: 999,
    border: "1px solid rgba(148, 163, 184, 0.24)",
    background: "rgba(15, 23, 42, 0.58)",
    marginTop: 9,
    boxSizing: "border-box",
  },

  nodeCard: {
    flex: 1,
    border: "1px solid rgba(148, 163, 184, 0.18)",
    borderRadius: 8,
    padding: 14,
    cursor: "pointer",
    backdropFilter: "blur(12px) saturate(130%)",
    WebkitBackdropFilter: "blur(12px) saturate(130%)",
  },

  nodeHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
  },

  nodeTitleWrap: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },

  nodeTitle: {
    fontSize: 15,
    fontWeight: 700,
    color: "#f8fafc",
    lineHeight: 1.4,
  },

  inlineTypeBadge: {
    display: "inline-flex",
    width: "fit-content",
    padding: "4px 8px",
    border: "1px solid",
    borderRadius: 999,
    fontSize: 11,
    fontWeight: 700,
    textTransform: "capitalize",
  },

  childCount: {
    fontSize: 12,
    color: "#94a3b8",
    whiteSpace: "nowrap",
    marginTop: 2,
  },

  nodeDescription: {
    marginTop: 12,
    color: "#cbd5e1",
    fontSize: 14,
    lineHeight: 1.6,
    borderTop: "1px solid rgba(255,255,255,0.11)",
    paddingTop: 12,
    animation: "branchIn 220ms ease both",
  },

  nodeCrudRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 12,
    paddingTop: 12,
    borderTop: "1px solid rgba(255,255,255,0.1)",
  },

  nodeCrudButton: {
    minHeight: 32,
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "7px 9px",
    borderRadius: 8,
    border: "1px solid rgba(125, 211, 252, 0.24)",
    background: "rgba(14, 165, 233, 0.09)",
    color: "#dbeafe",
    cursor: "pointer",
    fontSize: 12,
    fontWeight: 850,
  },

  nodeCrudIcon: {
    width: 15,
    height: 15,
  },

  childrenWrap: {
    marginLeft: 18,
    paddingLeft: 14,
    borderLeft: "1px solid rgba(148, 163, 184, 0.18)",
  },

  verticalLine: {
    position: "absolute",
    left: -10,
    top: 0,
    bottom: 0,
    width: 1,
    background: "linear-gradient(180deg, rgba(45, 212, 191, 0.28), rgba(244, 114, 182, 0.16))",
    opacity: 0.65,
  },
};
