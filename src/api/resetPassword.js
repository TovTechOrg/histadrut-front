// Temporary API for password reset
export const resetPassword = async (email) => {
  // Simulate POST to /reset-password
  return fetch("https://cv.pythia-match.com/reset-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  }).then(async (res) => {
    if (!res.ok) throw new Error("Failed to send reset email");
    return res.json();
  });
};

export const setNewPassword = async (email, password) => {
  // Simulate POST to /new-password
  return fetch("https://cv.pythia-match.com/new-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then(async (res) => {
    if (!res.ok) throw new Error("Failed to set new password");
    return res.json();
  });
};
