const mongoose = require("mongoose")

const settingSchema = new mongoose.Schema({

  leaderboardFrozen: {
    type: Boolean,
    default: false,
  },

  frozenLeaderboardData: {
    type: Array,
    default: [],
  },

  resultsVisible: {
    type: Boolean,
    default: true,
  },

  topScorersVisible: {
    type: Boolean,
    default: true,
  },

})

module.exports = mongoose.model(
  "Setting",
  settingSchema
)