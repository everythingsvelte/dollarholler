<h1 class="auth-heading">Sign Up</h1>
<form>
  <div class="field">
    <label for="fullName" class="text-goldenFizz">Full Name</label>
    <input type="text" name="fullName" id="fullName" required />
  </div>
  <div class="field">
    <label for="email" class="text-goldenFizz">Email Address</label>
    <input type="email" name="email" id="email" required />
  </div>
  <div class="field">
    <label for="password" class="text-goldenFizz">Password</label>
    <input type="password" name="password" id="password" required />
  </div>
  <div class="field">
    <label for="confirmPassword" class="text-goldenFizz">Confirm Password</label>
    <input type="password" name="confirmPassword" id="confirmPassword" required />
  </div>
  <button type="submit" class="auth-button">Count me in!</button>
  <p class="mt-4 text-center text-sm text-white">
    <a href="/login" class="underline hover:no-underline">Already have an account?</a>
  </p>
</form>
