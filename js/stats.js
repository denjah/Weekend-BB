async function updateDashboardStats() {
  try {
    // 1. Fetch data
    const [uploadsRes, commentsRes] = await Promise.all([
      fetch('api/data/uploads.json').catch(() => null),
      fetch('api/data/comments.json').catch(() => null)
    ]);

    const uploads = uploadsRes && uploadsRes.ok ? await uploadsRes.json() : [];
    const comments = commentsRes && commentsRes.ok ? await commentsRes.json() : [];

    // 2. Aggregate Data
    const uploadedSections = new Set(uploads.map(u => u.section_id));
    const commentedSections = new Set(comments.map(c => c.section_id));

    // Hardcode goals or calculate dynamically
    // Ch 3 uses logobookData length
    const ch3Total = window.logobookData ? window.logobookData.length : 125;
    
    // Approximate totals for other chapters based on standard brandbooks
    const chapterGoals = {
      1: 6,   // Brand Identity
      2: 6,   // Visual System
      3: ch3Total, // Logobook
      4: 5,   // Marketing
      5: 5,   // Corporate
      6: 3,   // Digital
      7: 4,   // Physical
      8: 3    // Resources
    };

    const chapterUploads = {
      1: new Set(), 2: new Set(), 3: new Set(), 4: new Set(),
      5: new Set(), 6: new Set(), 7: new Set(), 8: new Set()
    };

    // Assign uploads to chapters
    uploadedSections.forEach(id => {
      if (id.startsWith('1.')) chapterUploads[1].add(id);
      else if (id.startsWith('2.')) chapterUploads[2].add(id);
      else if (id.startsWith('page-')) chapterUploads[3].add(id);
      else if (id.startsWith('4.')) chapterUploads[4].add(id);
      else if (id.startsWith('5.')) chapterUploads[5].add(id);
      else if (id.startsWith('6.')) chapterUploads[6].add(id);
      else if (id.startsWith('7.')) chapterUploads[7].add(id);
      else if (id.startsWith('8.')) chapterUploads[8].add(id);
      else {
        // Fallback for custom sections if they exist
      }
    });

    let totalGoal = 0;
    let totalCompleted = 0;

    // 3. Update Bar Chart
    const bars = document.querySelectorAll('.sidebar-stats .bar-chart .bar-fill');
    for (let i = 1; i <= 8; i++) {
      const completed = chapterUploads[i].size;
      const goal = chapterGoals[i];
      const percent = Math.min(100, Math.round((completed / goal) * 100));
      
      if (bars[i-1]) {
        bars[i-1].style.height = `${percent}%`;
        // Optional: add title for tooltip
        bars[i-1].parentElement.title = `Раздел ${i}: ${completed} / ${goal}`;
      }
      
      totalGoal += goal;
      totalCompleted += completed;
    }

    // 4. Global Percentage
    const globalPercent = totalGoal > 0 ? Math.round((totalCompleted / totalGoal) * 100) : 0;
    
    const pieChart = document.querySelector('.sidebar-stats .pie-chart');
    const bigNum = document.querySelector('.sidebar-stats .big-num');
    
    if (pieChart) {
      pieChart.style.background = `conic-gradient(#1B2B5A 0% ${globalPercent}%, #e0e0e0 ${globalPercent}% 100%)`;
    }
    if (bigNum) {
      bigNum.textContent = `${globalPercent}%`;
    }

    // 5. Update Progress Rows
    // Text Blocks (Mocked as Ch 1, 5, 8)
    const textGoal = chapterGoals[1] + chapterGoals[5] + chapterGoals[8];
    const textCompleted = chapterUploads[1].size + chapterUploads[5].size + chapterUploads[8].size;
    const textPercent = textGoal > 0 ? Math.round((textCompleted / textGoal) * 100) : 0;
    
    const rowText = document.getElementById('statRowText');
    if (rowText) {
      rowText.querySelector('.val').textContent = `${textCompleted}/${textGoal}`;
      rowText.querySelector('.progress-bar-fill').style.width = `${textPercent}%`;
    }

    // Visuals (Mocked as Ch 2, 3, 4, 6, 7)
    const visualGoal = chapterGoals[2] + chapterGoals[3] + chapterGoals[4] + chapterGoals[6] + chapterGoals[7];
    const visualCompleted = chapterUploads[2].size + chapterUploads[3].size + chapterUploads[4].size + chapterUploads[6].size + chapterUploads[7].size;
    const visualPercent = visualGoal > 0 ? Math.round((visualCompleted / visualGoal) * 100) : 0;
    
    const rowVisual = document.getElementById('statRowVisual');
    if (rowVisual) {
      rowVisual.querySelector('.val').textContent = `${visualCompleted}/${visualGoal}`;
      rowVisual.querySelector('.progress-bar-fill').style.width = `${visualPercent}%`;
    }

    // Total uploaded files
    const rowTokens = document.getElementById('statRowTokens');
    if (rowTokens) {
      rowTokens.querySelector('.val').textContent = uploads.length;
      rowTokens.querySelector('.progress-bar-fill').style.width = `100%`; // It's just a count, no specific 100% max
    }

  } catch (err) {
    console.error('Failed to update stats:', err);
  }
}

// Call on load and export for global usage
document.addEventListener('DOMContentLoaded', () => {
  // Give it a small delay so other DOM parts like logobookData can initialize
  setTimeout(updateDashboardStats, 500);
});

// Expose globally so it can be called after uploads/comments
window.updateDashboardStats = updateDashboardStats;
