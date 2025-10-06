graph TD
    subgraph App Structure
        A[App.js/index.js] --> B(AuthContextProvider)
        B --> C{Application Routes/Router}
    end

    subgraph Data & Persistence
        D[localStorage (Key: 'auth')]
    end

    subgraph Context State Management
        E[usePersistedState Hook]
    end
    
    subgraph Consumer Components
        F[Login/Register View]
        G[Header/Profile View]
    end

    style B fill:#e0f7fa,stroke:#00bcd4,stroke-width:2px
    style E fill:#c8e6c9,stroke:#4caf50,stroke-width:2px
    style G fill:#fffde7,stroke:#ffeb3b,stroke-width:2px
    style F fill:#fffde7,stroke:#ffeb3b,stroke-width:2px
    style D fill:#bbdefb,stroke:#2196f3,stroke-width:2px
    
    
    direction LR
    
    %% INITIAL LOAD (Persistence)
    A -- Initial Render --> E
    E -- 1. Read 'auth' Key --> D
    D -- Return Stored Data (or {}) --> E
    E -- Initial State (authState) --> B
    
    %% DATA FLOW (Access)
    B -- Broadcast {contextData} via value prop --> C
    C --> F
    C --> G
    
    F -- 2a. Use useAuth() to get changeAuthState --> B
    G -- 2b. Use useAuth() to get isAuthenticated/logout --> B
    
    %% STATE UPDATE (Login/Logout)
    F -- 3. Successful Login/Register --> H(Call changeAuthState(newUser))
    H --> E
    H --> B
    
    I(Logout Button Click) --> J(Call logout())
    J --> E
    J --> B

    E -- 4. Save New State --> D
    
    B -- 5. State Change Triggers Re-render --> C