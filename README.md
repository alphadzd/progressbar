# 🟣 Modern Arabic Progressbar – by AlphaDev

A sleek, compact progress bar UI tailored for Arabic-supporting game interfaces. Positioned 15% from the bottom-left of the screen, it features a semi-transparent dark background, rounded edges, and a smooth purple animation.

🔗 **Preview**: [Image Link](https://cdn.discordapp.com/attachments/1377513657738596503/1378240052273872997/image.png)

## ✨ Features

* **Minimal & Clean**: Distraction-free UI with no icons
* **Smart Positioning**: Bottom-left alignment, out of gameplay focus
* **Arabic Text Ready**: Proper RTL font rendering
* **Smooth Animation**: Purple animated fill
* **Responsive Design**: Works on all screen sizes

---

## ⚙️ Usage with QB-Core

### ✅ Client Example

```lua
QBCore.Functions.Progressbar("task", "يتم الآن...", 5000, false, true, {
    disableMovement = false,
    disableCarMovement = false,
    disableMouse = false,
    disableCombat = true,
}, {
    animDict = "mp_suicide",
    anim = "pill",
    flags = 49,
}, {}, {}, function()
    -- Done
end, function()
    -- Cancelled
end)
```

---

## 📦 Exports

### Basic Export

```lua
exports['progressbar']:Progress({
    name = "task",
    duration = 5000,
    label = "يتم الآن...",
    useWhileDead = false,
    canCancel = true,
    controlDisables = {
        disableMovement = false,
        disableCarMovement = false,
        disableMouse = false,
        disableCombat = true,
    },
    animation = {
        animDict = "mp_suicide",
        anim = "pill",
        flags = 49,
    },
    prop = {},
    propTwo = {}
}, function(cancelled)
    if not cancelled then
        -- finished
    else
        -- cancelled
    end
end)
```

### Props Example

```lua
prop = {
  model = 'prop_notepad_01',
  bone = 18905,
  coords = vec3(0.1, 0.02, 0.05),
  rotation = vec3(10.0, 0.0, 0.0),
},
propTwo = {
  model = 'prop_pencil_01',
  bone = 58866,
  coords = vec3(0.11, -0.02, 0.001),
  rotation = vec3(-120.0, 0.0, 0.0),
}
```

### Utility

```lua
local busy = exports["progressbar"]:isDoingSomething()
```

### Advanced Exports

* `ProgressWithStartEvent(data, onStart, onFinish)`
* `ProgressWithTickEvent(data, onTick, onFinish)`
* `ProgressWithTickEvent(data, onStart, onTick, onFinish)`

---

🛡️ **© AlphaDev** – All rights reserved.
🔧 Optimized for **QB-Core** based servers.
